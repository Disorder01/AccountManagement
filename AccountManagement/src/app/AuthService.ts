import { Injectable } from "@angular/core";
import { User } from "../models/user";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user: User | null = null;

  login(user: User) { this._user = user; }
  logout()   { this._user = null; }

  get isLoggedIn(): boolean { return this._user !== null; }
  isAuthenticated(): boolean { return this.isLoggedIn; }

  get currentUserId(): number | null { return this._user?.id ?? null; }
  get currentUser(): User | null    { return this._user; }
}
