import { Component } from '@angular/core';
import { User } from '../../models/user';
import { ApiService } from '../../apiService';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  constructor(private apiService: ApiService) {}
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    password: ''
  };
  
  confirmPassword: string = '';
  
  createUser() {
    if (this.user.password !== this.confirmPassword) {
      alert('Passwörter stimmen nicht überein!');
      return;
    }
    
    this.apiService.registerNewUser(this.user)
    
    
  }
}
