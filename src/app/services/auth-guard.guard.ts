import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from './keycloack.service';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = async (route, state) => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);

  try {
    await keycloakService.init();

    keycloakService.logToken(); // Log the token
    const userRoles = keycloakService.getUserRoles(); // Log user roles

    const expectedRole = route.data['role'] as string;
    console.log(`Expected role: ${expectedRole}`);
    console.log(`User roles: ${userRoles}`);

    if (keycloakService.isAuthenticated() && keycloakService.hasRole(expectedRole)) {
      return true;
    } else {
      console.warn(`Access denied - User does not have the role: ${expectedRole}`);
      return router.navigate(['/']);
    }
  } catch (error) {
    console.error('Error in guard:', error);
    return router.navigate(['/login']);
  }
};
