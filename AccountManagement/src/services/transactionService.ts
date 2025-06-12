import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account';

export type TransactionType = 'deposit' | 'withdraw';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private baseUrl = 'http://localhost:3000/api/accounts';

  constructor(private http: HttpClient) {}

  // Prüfen ob Kontostand größer als Null ist
  checkAccountBalance(balance: number): boolean {
    return balance > 0;
  }

  processTransaction(
    accountNumber: number,
    amount: number,
    type: TransactionType
  ) {
    return this.http.post<{ success: boolean; account: Account }>(
      `${this.baseUrl}/${accountNumber}/transaction`,
      { amount, type }
    );
  }
}
