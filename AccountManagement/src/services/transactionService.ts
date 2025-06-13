import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account';

export type TransactionType = 'deposit' | 'withdraw';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private baseUrl = 'http://localhost:3000/api/accounts';

  constructor(private http: HttpClient) {}

  // Prüfen ob Kontostand größer als Null ist
  checkAccountBalance(
    balance: number,
    amount: number,
    type: TransactionType,
    overdraftLimit: number
  ): boolean {
    if (type === 'withdraw') {
      return (balance - amount) >= -overdraftLimit;
    }
    return true;
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

  transfer(
    fromAccount: number,
    toAccount: number,
    amount: number
  ) {
    return this.http.post<{
      success: boolean;
      sourceAccount: Account;
      targetAccount: Account;
    }>(
      `${this.baseUrl}/${fromAccount}/transfer`,
      { targetAccountNumber: toAccount, amount }
    );
  }
}
