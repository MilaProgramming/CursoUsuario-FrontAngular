import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { KeycloackService } from './services/keycloack.service'; // Path to your Keycloak service

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fixed 'styleUrl' to 'styleUrls'
})
export class AppComponent implements OnInit {
  title = 'front_angular';

  // Using inject() to get an instance of the service
  private keycloackService = inject(KeycloackService);

  async ngOnInit() {
    await this.keycloackService.init(); // Initialize Keycloak on app start
  }
}
