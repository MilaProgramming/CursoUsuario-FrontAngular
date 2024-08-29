import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from '../../services/keycloack.service'; // Adjust path if necessary

@Component({
  selector: 'app-present',
  standalone: true,
  templateUrl: './present.component.html',
  styleUrls: ['./present.component.css'] // Ensure correct path
})
export class PresentComponent {
  private keycloakInitialized: boolean = false;

  constructor(private keycloakService: KeycloakService, private router: Router) {
    console.log('PresentComponent initialized');
  }

  private async initializeKeycloak(): Promise<void> {
    try {
      if (!this.keycloakInitialized) {
        await this.keycloakService.init();
        this.keycloakInitialized = true;
      }
    } catch (error) {
      console.error('Error initializing Keycloak:', error);
    }
  }

  async login(): Promise<void> {
    if (!this.keycloakInitialized) {
      await this.initializeKeycloak();
    }

    if (this.keycloakService.isAuthenticated()) {
      console.log('User is already authenticated');
    } else {
      this.keycloakService.init(); // Start the login process
    }
  }
}
