import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-usuario-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './usuario-usuario.component.html',
  styleUrl: './usuario-usuario.component.css'
})


export class UsuarioUsuarioComponent {
  showEditModal: boolean = false;
  nombre: string = 'John Doe';
  email: string = 'john.doe@example.com';
  showChangePasswordModal = false;
  currentPassword = '123';
  newPassword = '';
  confirmNewPassword = '';
  passwordsMatch = true;

  // Function to open the modal with preset values
  openEditModal() {
    this.showEditModal = true;
  }

  // Function to handle closing the modal
  handleCloseEditModal() {
    this.showEditModal = false;
  }

  // Function to handle saving the changes
  handleEditAceptarClick() {
    // Implement the logic to update the user data
    // Then close the modal
    this.handleCloseEditModal();
  }

  checkNewPasswordMatch() {
    this.passwordsMatch = this.newPassword === this.confirmNewPassword;
  }

  handleUpdatePasswordClick() {
    this.showChangePasswordModal = true;
  }

  handleSaveNewPassword() {
    if (this.passwordsMatch) {
      // Handle the password update logic here
      console.log('Password updated successfully.');
      this.handleCloseChangePasswordModal();
    }
  }

  handleCloseChangePasswordModal() {
    this.showChangePasswordModal = false;
  }
}
