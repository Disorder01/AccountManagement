import { Component } from '@angular/core';
import { ApiService } from '../../apiService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  lastname: string = '';
  password: string = '';  

  constructor(private apiService: ApiService) {}
  
  login() {
    this.apiService.login(this.lastname, this.password);
  }
}
