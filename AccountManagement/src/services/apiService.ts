import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../app/AuthService';
import { Account } from '../models/account';

@Injectable({ providedIn: 'root' })
export class ApiService {
  user: User | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  registerNewUser(user: User) {
    return this.http.post('http://localhost:3000/api/register', user);
  }

  login(lastName: string, password: string) {
    this.http
      .post<{ success: boolean; user?: User }>(
        'http://localhost:3000/api/login',
        { lastName, password }
      )
      .subscribe({
        next: (res) => {
          if (res.success && res.user) {
            this.user = res.user;
            this.authService.login(res.user);
            alert('Login erfolgreich!');
            this.router.navigate(['/overview']);
          } else {
            alert('Falscher Nachname oder Passwort!');
          }
        },
        error: () => {
          alert('Fehler beim Login: Nachname oder Passwort falsch!');
        },
      });
  }

  createAccount(account: Account) {
    return this.http.post<{ success: boolean; account?: Account }>(
      'http://localhost:3000/api/accounts',
      account
    );
  }

  getUserAccounts(customerId: number) {
    return this.http.get<{ success: boolean; accounts: Account[] }>(
      `http://localhost:3000/api/accounts/${customerId}`
    );
  }

  updateUser(user: User) {
    return this.http.put<{ success: boolean; user?: User }>(
      `http://localhost:3000/api/users/${user.id}`,
      user
    );
  }
}
