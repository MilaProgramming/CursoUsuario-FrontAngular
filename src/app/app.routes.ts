import { Routes } from '@angular/router';
import { HomeComponent } from './pages/admin/home/home.component';
import { HomeUsuarioComponent } from './pages/user/home-usuario/home-usuario.component';
import { PresentComponent } from './pages/home/present.component';
import { AuthGuardService } from './services/auth-guard.service'; // Import the AuthGuard

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    data: { role: 'admin' } // Only 'admin' role can access this route
  },
  {
    path: 'homeUsuario',
    component: HomeUsuarioComponent,
    canActivate: [AuthGuardService],
    data: { role: 'usuario' } // Only 'usuario' role can access this route
  },
  {
    path: 'present',
    component : PresentComponent
  },
  {
    path: '',
    redirectTo: '/present',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/present'
  }
];
