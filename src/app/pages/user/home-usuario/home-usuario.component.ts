import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioUsuarioComponent } from '../usuario-usuario/usuario-usuario.component';
import { CursoUsuarioComponent } from '../curso-usuario/curso-usuario.component';
import { KeycloakService } from '../../../services/keycloack.service'; // Update with the correct path

@Component({
  selector: 'app-home-usuario',
  standalone: true,
  imports: [CommonModule, UsuarioUsuarioComponent, CursoUsuarioComponent],
  templateUrl: './home-usuario.component.html',
  styleUrls: ['./home-usuario.component.css'] // Fix styleUrl to styleUrls
})
export class HomeUsuarioComponent {
  tabla: string = 'usuario';

  constructor(private keycloakService: KeycloakService) {}

  setTabla(tabla: string) {
    this.tabla = tabla;
  }

  logout() {
    this.keycloakService.logout();
  }
}
