import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account';
import { AuthService } from '../AuthService';
import { ApiService } from '../../services/apiService';
import { TransactionService, TransactionType } from '../../services/transactionService';
import { AccountType } from '../../enums/accountType';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  accounts: Account[] = [];
  columns: Array<keyof Account> = [];
  userId = 0;

  // Transaktion-Form
  showTransactionForm = false;
  transactionType: TransactionType = 'deposit';
  selectedAccount!: Account;
  transactionAmount = 0;

  constructor(
    private auth: AuthService,
    private apiService: ApiService,
    private txService: TransactionService
  ) {}

  ngOnInit() {
    this.userId = this.auth.currentUserId ?? 0;
    this.loadAccounts();
  }

  private loadAccounts() {
    this.apiService.getUserAccounts(this.userId).subscribe({
      next: res => {
        if (res.success) {
          this.accounts = res.accounts;
          if (res.accounts.length) {
            this.columns = Object.keys(res.accounts[0]) as Array<keyof Account>;
          }
        }
      },
      error: err => console.error('Konto-Laden fehlgeschlagen', err)
    });
  }

  deposit(account: Account) {
    console.log('Klick auf Einzahlen!', account);
    this.openTransactionForm(account, 'deposit');
  }

  withdraw(account: Account) {
    console.log('Klick auf Einzahlen!', account);
    this.openTransactionForm(account, 'withdraw');
  }

  private openTransactionForm(account: Account, type: TransactionType) {
    this.selectedAccount = account;
    this.transactionType = type;
    this.transactionAmount = 0;
    this.showTransactionForm = true;
  }

  confirmTransaction() {
    // Prüfen ob es ein Girokonto ist, welches überzogen wird
    if (
      this.selectedAccount.accountType === AccountType.Giro &&
      !this.txService.checkAccountBalance(this.selectedAccount.accountBalance)
    ) {
      alert("Ein Girokonto darf nicht überzogen werden!");
      return;
    }

    this.txService
      .processTransaction(this.selectedAccount.accountNumber!, this.transactionAmount, this.transactionType)
      .subscribe({
        next: res => {
          if (res.success && res.account) {
            // Lokales Update
            const idx = this.accounts.findIndex(a => a.accountNumber === this.selectedAccount.accountNumber);
            this.accounts[idx].accountBalance = res.account.accountBalance;
          }
          this.cancelTransaction();
        },
        error: err => console.error('Transaktion fehlgeschlagen', err)
      });
  }

  cancelTransaction() {
    this.showTransactionForm = false;
  }

  edit(account: Account) {
    console.log('Konto bearbeiten', account);
  }
}
