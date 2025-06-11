import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account';
import { AuthService } from '../AuthService';
import { ApiService } from '../../services/apiService';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  accounts: Account[] = [];
  columns: Array<keyof Account> = [];
  userId: number = 0;

  constructor(
    private auth: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.userId = this.auth.currentUserId ?? 0;

    this.apiService.getUserAccounts(this.userId).subscribe({
      next: res => {
        if (res.success && res.accounts.length) {
          this.accounts = res.accounts;
          this.columns = Object.keys(this.accounts[0]) as Array<keyof Account>;
        }
      },
      error: err => console.error('Konto-Laden fehlgeschlagen', err)
    });
  }

  deposit(account: Account) {
    console.log('Einzahlen für Konto', account);
  }

  withdraw(account: Account) {
    console.log('Auszahlen für Konto', account);
  }

  edit(account: Account) {
    console.log('Konto bearbeiten', account);
  }
}
