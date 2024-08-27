import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { HomeUsuarioComponent } from './pagesUser/home-usuario/home-usuario.component';
import { PresentComponent } from './pages/present/present.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'homeUsuario',
    component: HomeUsuarioComponent
  },
  {
    path: 'login',
    component: LoginRegisterComponent
  },
  {
    path: 'home',
    component : PresentComponent
  }

];
