import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly baseUrl = '/api/accounts';

  constructor(private http: HttpClient) {}

  getAccountsByUser(userId: number): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}`, {
      params: { userId: userId.toString() }
    });
  }

//   createAccount(account: Account): Observable<Account> {
//     return this.http.post<Account>(this.baseUrl, account);
//   }

//   updateAccount(account: Account): Observable<Account> {
//     return this.http.put<Account>(`${this.baseUrl}/${account.id}`, account);
//   }

//   deleteAccount(accountId: number): Observable<void> {
//     return this.http.delete<void>(`${this.baseUrl}/${accountId}`);
//   }
}
