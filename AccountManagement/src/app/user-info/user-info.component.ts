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
  private originalUser: User | null = null;
  editMode = false;
  userId!: number;
  accounts: Account[] = [];

  constructor(private authService: AuthService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.originalUser = this.user ? { ...this.user } : null;
    const id = this.authService.currentUserId;
    if (id !== null) {
      this.userId = id;
      this.loadAccounts();
    }
  }

    toggleEdit(): void {
    this.editMode = !this.editMode;
    if (!this.editMode && this.originalUser) {
      // beim Abbruch zurücksetzen
      this.user = { ...this.originalUser };
    }
  }

    saveUser(): void {
    if (!this.user) { return; }
    this.apiService.updateUser(this.user).subscribe({
      next: res => {
        if (res.success) {
          // neuen Stand ins original übernehmen
          this.originalUser = { ...this.user! };
          this.editMode = false;
        } else {
          console.error('Speichern fehlgeschlagen', res);
        }
      },
      error: err => console.error('Speichern fehlgeschlagen', err)
    });

    this.editMode = false;
  }

  cancelEdit(): void {
    this.toggleEdit();  // setzt automatisch zurück
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
