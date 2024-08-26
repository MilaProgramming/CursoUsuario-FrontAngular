import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { HomeUsuarioComponent } from './pagesUser/home-usuario/home-usuario.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'homeUsuario',
    component: HomeUsuarioComponent
  },
  {
    path: '',
    component: LoginRegisterComponent
  },
];
