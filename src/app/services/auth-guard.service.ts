import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { KeycloackService } from './keycloack.service'; // Path to your Keycloak service
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  constructor(private keycloackService: KeycloackService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const expectedRole = route.data['role']; // Get the role required by the route

    return this.keycloackService.isAuthenticated().then(authenticated => {
      if (authenticated) {
        return this.keycloackService.hasRole(expectedRole).then(hasRole => {
          if (hasRole) {
            return true;
          } else {
            // If user doesn't have the role, redirect to an unauthorized page or the home page
            this.router.navigate(['/present']);
            return false;
          }
        });
      } else {
        // If user is not authenticated, redirect to login
        this.keycloackService.login();
        return false;
      }
    });
  }
}
