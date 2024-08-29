import { Routes } from '@angular/router';
import { HomeComponent } from './pages/admin/home/home.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { HomeUsuarioComponent } from './pages/user/home-usuario/home-usuario.component';
import { PresentComponent } from './pages/home/present.component';
import { authGuardGuard } from './services/auth-guard.guard'; // Ensure correct path

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuardGuard],
    data: { role: 'admin' }
  },
  {
    path: 'homeUsuario',
    component: HomeUsuarioComponent,
    canActivate: [authGuardGuard],
    data: { role: 'usuario' }
  },
  {
    path: 'login',
    component: LoginRegisterComponent
  },
  {
    path: '',
    component: PresentComponent
  }
];
