import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedIn = false;  // change
  private _currentUserId: number | null = null;

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  setCurrentUserId(id: number) {
    this._currentUserId = id;
  }

  get currentUserId(): number | null {
    return this._currentUserId;
  }
}