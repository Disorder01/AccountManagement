import { Injectable } from "@angular/core";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() {}

  validateLastName(lastName: string): string | null {
    if (!lastName || lastName.trim().length < 2) {
      return 'Bitte einen gültigen Nachnamen mit mindestens 2 Zeichen eingeben.';
    }
    return null;
  }

  validateFirstName(firstName: string): string | null {
    if (!firstName || firstName.trim().length < 2) {
      return 'Bitte einen gültigen Vornamen mit mindestens 2 Zeichen eingeben.';
    }
    return null;
  }

  validatePassword(password: string): string | null {
    if (!password) {
      return 'Passwort darf nicht leer sein.';
    } else if (password.length < 8) {
      return 'Passwort muss mindestens 8 Zeichen lang sein.';
    } else if (!/[A-Z]/.test(password)) {
      return 'Passwort muss mindestens einen Großbuchstaben enthalten.';
    } else if (!/[0-9]/.test(password)) {
      return 'Passwort muss mindestens eine Zahl enthalten.';
    }
    return null;
  }

  validateConfirmPassword(password: string, confirmPassword: string): string | null {
    if (password !== confirmPassword) {
      return 'Passwörter stimmen nicht überein!';
    }
    return null;
  }

  validateUser(user: User, confirmPassword: string): {[key: string]: string} {
    const errors: {[key: string]: string} = {};

    const lastNameError = this.validateLastName(user.lastName);
    if (lastNameError) errors["lastName"] = lastNameError;

    const firstNameError = this.validateFirstName(user.firstName);
    if (firstNameError) errors["firstName"] = firstNameError;

    const passwordError = this.validatePassword(user.password);
    if (passwordError) errors["password"] = passwordError;

    const confirmPasswordError = this.validateConfirmPassword(user.password, confirmPassword);
    if (confirmPasswordError) errors["confirmPassword"] = confirmPasswordError;

    return errors;
  }
}
