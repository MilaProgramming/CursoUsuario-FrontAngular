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
  password?: string;
}

interface Curso {
  id: number;
  nombre: string;
  cursoUsuarios: { id: number; usuarioId: number }[];
}

@Component({
  selector: 'app-curso-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './curso-usuario.component.html',
  styleUrls: ['./curso-usuario.component.css']
})
export class CursoUsuarioComponent implements OnInit {
  usuario: Usuario | null = null;
  cursos: Curso[] = [];
  isEnrolled: boolean = false;

  private apiUrlUsuario = environment.apiUrlUsuario;
  private apiUrlCurso = environment.apiUrlCurso;

  private http = inject(HttpClient);
  private keycloakService = inject(KeycloakService);

  ngOnInit(): void {
    this.loadUsuarioData();
    this.fetchCursos();
  }

  private loadUsuarioData(): void {
    const username = this.getUserName();
    if (username) {
      this.getUsuarioByUsername(username).subscribe(usuario => {
        if (usuario && usuario.id) {
          this.usuario = usuario;
        }
      });
    }
  }

  private getUserName(): string | null {
    const tokenParsed = this.keycloakService['keycloakInstance'].tokenParsed;
    return tokenParsed ? tokenParsed['preferred_username'] : null;
  }

  private getUsuarioByUsername(username: string) {
    return this.http.get<Usuario[]>(`${this.apiUrlUsuario}/api/usuarios/listar`).pipe(
      map(users => users.find(user => user.nombre === username))
    );
  }

  private fetchCursos(): void {
    this.http.get<Curso[]>(`${this.apiUrlCurso}/cursos`).subscribe(
      data => {
        this.cursos = data;
        if (this.usuario) {
          this.checkEnrollment();
        }
      },
      error => {
        console.error('Error fetching cursos:', error);
      }
    );
  }

  private checkEnrollment(): void {
    if (!this.usuario) return;

    this.isEnrolled = this.cursos.some(curso =>
      curso.cursoUsuarios.some(cursoUsuario => cursoUsuario.usuarioId === this.usuario?.id)
    );
  }

  get enrolledCursos(): Curso[] {
    return this.cursos.filter(curso =>
      curso.cursoUsuarios.some(cu => cu.usuarioId === this.usuario?.id)
    );
  }

  get availableCursos(): Curso[] {
    return this.cursos.filter(curso =>
      !curso.cursoUsuarios.some(cu => cu.usuarioId === this.usuario?.id)
    );
  }

  handleInscribir(cursoId: number): void {
    if (!this.usuario) return;

    this.http.put(`${this.apiUrlCurso}/cursos/${cursoId}/agregar-usuario`, {
      id: this.usuario.id,
      nombre: this.usuario.nombre,
      email: this.usuario.email,
      password: this.usuario.password
    }).subscribe(
      () => {
        this.fetchCursos();
        this.checkEnrollment();
      },
      error => {
        console.error('Error adding inscripcion:', error);
      }
    );
  }

  handleDesinscribir(cursoId: number): void {
    const inscripcionId = this.getCursoUsuarioId(cursoId);

    if (inscripcionId === null) return;

    this.http.put(`${this.apiUrlCurso}/cursos/${cursoId}/eliminar-usuario/${inscripcionId}`, {}).subscribe(
      () => {
        this.fetchCursos();
        this.checkEnrollment();
      },
      error => {
        console.error('Error removing inscripcion:', error);
      }
    );
  }

  private getCursoUsuarioId(cursoId: number): number | null {
    // Find the curso by ID
    const curso = this.cursos.find(c => c.id === cursoId);

    // Check if curso is found and usuario is not null
    if (curso && this.usuario) {
      // Check if curso.cursoUsuarios is defined and not null
      const cursoUsuarios = curso.cursoUsuarios;

      if (cursoUsuarios) {
        // Use optional chaining to safely access usuario.id
        const cursoUsuario = cursoUsuarios.find(cu => cu.usuarioId === this.usuario?.id);

        // Return the ID if found, otherwise return null
        if (cursoUsuario) {
          return cursoUsuario.id;
        }
      }
    }
    return null;
  }
}
