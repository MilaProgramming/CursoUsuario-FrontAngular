import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioUsuarioComponent } from '../usuario-usuario/usuario-usuario.component';
import { CursoUsuarioComponent } from '../curso-usuario/curso-usuario.component';

@Component({
  selector: 'app-home-usuario',
  standalone: true,
  imports: [CommonModule, UsuarioUsuarioComponent, CursoUsuarioComponent],
  templateUrl: './home-usuario.component.html',
  styleUrl: './home-usuario.component.css'
})

export class HomeUsuarioComponent {
  tabla: string = 'usuario';

  setTabla(tabla: string) {
    this.tabla = tabla;
  }
}
