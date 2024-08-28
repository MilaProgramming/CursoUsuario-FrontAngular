import { Component } from '@angular/core';
import { KeycloackService } from '../../services/keycloack.service';

@Component({
  selector: 'app-present',
  standalone: true,
  imports: [],
  templateUrl: './present.component.html',
  styleUrl: './present.component.css'
})
export class PresentComponent {

  constructor(private keycloackService: KeycloackService) { }

  onAccessButtonClick() {
    this.keycloackService.login();
  }

}
