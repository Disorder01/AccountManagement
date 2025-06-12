// registration.component.ts
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ApiService } from '../../services/apiService';
import { ValidationService } from '../../services/validationService';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  user: User = { id: 0, firstName: '', lastName: '', password: '', accounts: [] };
  confirmPassword: string = '';
  validationErrors: Record<string, string> = {};
  // neue Property: speichert, welche Felder bereits einmal fokussiert wurden
  touchedFields: Record<string, boolean> = {};

  constructor(
    private apiService: ApiService,
    private validationService: ValidationService
  ) {}

  ngOnInit(): void {}

  /** wird aufgerufen, sobald ein Input den Fokus erhält */
  onFieldFocus(field: string): void {
    this.touchedFields[field] = true;
  }

  /**
   * Prüft das Formular über den ValidationService und befüllt validationErrors.
   */
  isFormValid(): boolean {
    this.validationErrors = this.validationService.validateUser(
      this.user,
      this.confirmPassword
    );
    return Object.keys(this.validationErrors).length === 0;
  }

  /**
   * Sendet die Daten nur, wenn das Formular valide ist.
   */
  createUser(): void {
    if (!this.isFormValid()) {
      return;
    }

    this.apiService.registerNewUser(this.user).subscribe({
      next: () => {
        alert('Profil erfolgreich erstellt!');
      },
      error: err => {
        console.error('Fehler beim Erstellen des Profils', err);
        alert('Es ist ein Fehler aufgetreten. Bitte erneut versuchen.');
      }
    });
  }
}
