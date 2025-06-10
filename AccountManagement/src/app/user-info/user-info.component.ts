import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app/AuthService';
import { User } from '../../models/user';
import { Account } from '../../models/account';
import { ApiService } from '../../services/apiService';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  user: User | null = null;
  userId!: number;
  accounts: Account[] = [];

  constructor(private authService: AuthService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    const id = this.authService.currentUserId;
    if (id !== null) {
      this.userId = id;
      this.loadAccounts();
    }
  }

  private loadAccounts(): void {
    this.apiService.getUserAccounts(this.userId).subscribe({
      next: res => {
        if (res.success) {
          this.accounts = res.accounts;
        }
      },
      error: err => console.error('Konto-Laden fehlgeschlagen', err)
    });
  }
}
