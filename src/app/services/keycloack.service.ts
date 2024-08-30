import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private keycloakInstance: Keycloak;
  private initPromise: Promise<void> | null = null;

  constructor() {
    this.keycloakInstance = new Keycloak({
      url: 'http://keycloak-service:8080',
      realm: 'Microservicios',
      clientId: 'angular',
    });
  }

  init(): Promise<void> {
    if (this.initPromise) {
      console.log('Keycloak is already initializing or initialized.');
      return this.initPromise;
    }

    console.log('Initializing Keycloak...');
    this.initPromise = this.keycloakInstance
      .init({
        onLoad: 'login-required',
      })
      .then(authenticated => {
        console.log('Keycloak initialized:', authenticated);
        if (!authenticated) {
          window.location.reload();
        } else {
          localStorage.setItem('token', this.keycloakInstance.token || '');
        }
      })
      .catch(err => {
        console.error('Keycloak initialization error:', err);
        this.initPromise = null; // Reset promise if initialization fails
        throw err;
      });

    return this.initPromise;
  }

  isAuthenticated(): boolean {
    return this.keycloakInstance.authenticated || false;
  }

  getToken(): string | undefined {
    return this.keycloakInstance.token;
  }

  getUserRoles(): string[] {
    const tokenParsed = this.keycloakInstance.tokenParsed;
    console.log('Token Parsed:', tokenParsed); // Log the token content
    if (tokenParsed && tokenParsed.realm_access) {
      return tokenParsed.realm_access.roles || [];
    }
    return [];
  }

  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }

  logToken(): void {
    console.log('Token:', this.keycloakInstance.token);
  }

  logout(): void {
    this.keycloakInstance.logout({
      redirectUri: window.location.origin,
    });
  }

}
