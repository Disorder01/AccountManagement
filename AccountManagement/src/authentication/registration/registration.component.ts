import { Component } from '@angular/core';
import { User } from '../../app/models/user';
import { ApiService } from '../../services/apiService';
import { ValidationService } from '../../services/validationService';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    password: ''
  };

  confirmPassword: string = '';

  validationErrors: {
    lastName?: string;
    firstName?: string;
    password?: string;
    confirmPassword?: string;
  } = {};

  constructor(private apiService: ApiService, private validationService: ValidationService) {}

  createUser() {
    this.validationErrors = this.validationService.validateUser(this.user, this.confirmPassword);

    if (Object.keys(this.validationErrors).length > 0) {
      // Fehler vorhanden, abbrechen
      return;
    }

    this.apiService.registerNewUser(this.user)
      .subscribe({
        next: () => alert('Profil erfolgreich erstellt!'),
        error: (err: any) => alert('Fehler bei der Erstellung: ' + err.message)
      });
  }
}
