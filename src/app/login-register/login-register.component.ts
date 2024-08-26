import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})

export class LoginRegisterComponent {
  isLoginMode = true;  // Variable to toggle between login and register

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;  // Toggle between login and register mode
  }
}
