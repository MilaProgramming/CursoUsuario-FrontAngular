import { Injectable } from '@angular/core';
import { KeycloakService, KeycloakEventType } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})

export class KeycloackService {
  private userProfile: KeycloakProfile | null = null;

  constructor(private keycloak: KeycloakService) {}

  async init(): Promise<void> {
    try {
      await this.keycloak.init({
        config: {
          url: 'http://localhost:8080', // Keycloak server URL
          realm: 'master', // Your realm name
          clientId: 'my-angular-app', // Your client ID
        },
        initOptions: {
          onLoad: 'login-required', // Redirect to login page if not authenticated
          pkceMethod: 'S256', // Recommended for public clients
          checkLoginIframe: false,
        },
        loadUserProfileAtStartUp: true,
        enableBearerInterceptor: true,
        bearerExcludedUrls: ['/assets'],
      });

      this.userProfile = await this.keycloak.loadUserProfile();
      console.log('User Profile loaded:', this.userProfile);

      this.keycloak.keycloakEvents$.subscribe({
        next: (event) => {
          if (event.type === KeycloakEventType.OnAuthSuccess) {
            console.log('Authentication successful!');
          }
        },
      });
    } catch (error) {
      console.error('Keycloak initialization failed', error);
    }
  }

  login(): void {
    this.keycloak.login();
  }

  logout(): void {
    this.keycloak.logout();
  }

  async getToken(): Promise<string | undefined> {
    return this.keycloak.getToken();
  }

  async isAuthenticated(): Promise<boolean> {
    return this.keycloak.isLoggedIn();
  }

  getUserProfile(): KeycloakProfile | null {
    return this.userProfile;
  }

  async getUserRoles(): Promise<string[]> {
    return this.keycloak.getUserRoles();
  }

  async hasRole(role: string): Promise<boolean> {
    const roles = await this.getUserRoles();
    return roles.includes(role);
  }

}
