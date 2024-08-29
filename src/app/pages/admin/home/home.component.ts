import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from '../usuario/usuario.component';
import { ClaseComponent } from '../clase/clase.component';
import { InscripcionComponent } from '../inscripcion/inscripcion.component';
import { KeycloakService } from '../../../services/keycloack.service'; // Ensure correct path
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, UsuarioComponent, ClaseComponent, InscripcionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent{

  constructor(private keycloakService: KeycloakService) {
    console.log('Home initialized');
  }

  tabla: string = 'usuario';

  setTabla(tabla: string) {
    this.tabla = tabla;
  }
}
