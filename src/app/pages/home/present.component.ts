import { Component } from '@angular/core';
import { KeycloakService } from '../../services/keycloack.service'; // Adjust path if necessary

@Component({
  selector: 'app-present',
  standalone: true,
  templateUrl: './present.component.html',
  styleUrls: ['./present.component.css'] // Ensure correct path
})
export class PresentComponent {
  constructor(private keycloakService: KeycloakService) {
    console.log('PresentComponent initialized');
  }

  login() {
    this.keycloakService.init();
  }
}
