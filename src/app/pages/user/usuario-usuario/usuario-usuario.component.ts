import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { KeycloakService } from '../../../services/keycloack.service';
import { map } from 'rxjs/operators';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password?: string; // Optional if not used for fetching
}

@Component({
  selector: 'app-usuario-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './usuario-usuario.component.html',
  styleUrls: ['./usuario-usuario.component.css']
})
export class UsuarioUsuarioComponent implements OnInit {
  usuario: Usuario | null = null;
  private apiUrl = environment.apiUrlUsuario;
  private http = inject(HttpClient);
  private keycloakService = inject(KeycloakService);

  ngOnInit(): void {
    this.loadUsuarioData();
  }

  private loadUsuarioData(): void {
    const username = this.getUserName();
    if (username) {
      this.getUsuarioByUsername(username).subscribe((usuario) => {
        if (usuario && usuario.id) {
          this.getUsuarioById(usuario.id).subscribe((usuarioDetalle) => {
            this.usuario = usuarioDetalle;
          });
        }
      });
    }
  }

  private getUserName(): string | null {
    const tokenParsed = this.keycloakService['keycloakInstance'].tokenParsed;
    return tokenParsed ? tokenParsed['preferred_username'] : null;
  }

  private getUsuarioByUsername(username: string) {
    return this.http.get<Usuario[]>(`${this.apiUrl}/api/usuarios/listar`).pipe(
      map(users => users.find(user => user.nombre === username))
    );
  }

  private getUsuarioById(id: number) {
    return this.http.get<Usuario>(`${this.apiUrl}/api/usuarios/detalle/${id}`);
  }
}
