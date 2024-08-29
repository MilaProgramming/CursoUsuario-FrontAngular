import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { KeycloakService } from '../../services/keycloack.service';

@Component({
  selector: 'app-present',
  standalone: true,
  templateUrl: './present.component.html',
  styleUrls: ['./present.component.css'],
  imports: [CommonModule]
})
export class PresentComponent {

  isLoggedIn: boolean = false;
  userName: string | null = null;

  constructor(private keycloakService: KeycloakService, private router: Router) {
    console.log('PresentComponent initialized');
  }


  async login(): Promise<void> {
    try {

      console.log('Attempting login...');
      await this.keycloakService.init();

      if (this.keycloakService.isAuthenticated()) {
        console.log('User is already authenticated');
        this.redirectUser();
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  private redirectUser(): void {
    const userRoles = this.keycloakService.getUserRoles();
    console.log('User roles:', userRoles); // Log user roles

    if (userRoles.includes('admin')) {
      console.log('Redirecting to /home');
      this.router.navigate(['/home']);
    } else if (userRoles.includes('usuario')) {
      console.log('Redirecting to /homeUsuario');
      this.router.navigate(['/homeUsuario']);
    } else {
      console.warn('No valid role found for redirection');
      this.router.navigate(['/']);
    }
  }

}
