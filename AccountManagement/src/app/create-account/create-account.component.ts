import { Component, OnInit } from '@angular/core';
import { AccountType } from '../../enums/accountType';
import {
  SparAccount,
  GiroAccount,
  TagesgeldAccount,
  Account,
} from '../../models/account';
import { AuthService } from '../../app/AuthService';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  accountTypes = AccountType;
  accountTypeLabels: Record<AccountType, string> = {
    [AccountType.Giro]: 'Girokonto',
    [AccountType.Spar]: 'Sparkonto',
    [AccountType.Tagesgeld]: 'Tagesgeldkonto',
  };

  get accountTypeValues(): AccountType[] {
    return Object.values(this.accountTypes).filter(
      (v) => typeof v === 'string'
    ) as AccountType[];
  }

  selectedType: AccountType | null = null;
  userId!: number;

  accountBalance!: number;

  overdraftLimit!: number;
  pin: string = '';

  readonly FIXED_INTEREST_RATE = 2.5; // 2,5 % p. a.
  monthlyDeposit!: number;
  goal!: number;

  dailyPayout!: number;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const id = this.authService.currentUserId;
    if (id === null) {
      console.error('Kein User eingeloggt – CreateAccountComponent ohne userId');
      // this.router.navigate(['/login']);
    } else {
      this.userId = id;
    }
  }

  isValidPin(pin: string): boolean {
    const pinRegex = /^\d{4}$/;
    return pinRegex.test(pin);
  }

  isFormValid(): boolean {
    if (this.accountBalance == null || this.selectedType == null) {
      return false;
    }
    switch (this.selectedType) {
      case AccountType.Giro:
        return (
          this.overdraftLimit != null &&
          this.pin != null &&
          this.isValidPin(this.pin)
        );

      case AccountType.Spar:
        return (
          this.monthlyDeposit != null &&
          this.monthlyDeposit >= 0 &&
          this.goal != null &&
          this.goal >= 0
        );

      case AccountType.Tagesgeld:
        return this.dailyPayout != null && this.dailyPayout >= 0;

      default:
        return false;
    }
  }

  private generateAccountNumber(): number {
    return Math.floor(1e9 + Math.random() * 9e9);
  }

  createAccount(): void {
    if (!this.isFormValid() || this.selectedType === null) {
      return;
    }

    const newAccountNumber = this.generateAccountNumber();
    let newAccount: Account;

    switch (this.selectedType) {
      case AccountType.Giro: {
        const giro: GiroAccount = {
          accountNumber: newAccountNumber,
          customerId: this.userId,
          accountType: AccountType.Giro,
          accountBalance: this.accountBalance,
          overdraftLimit: this.overdraftLimit,
          pin: this.pin,
        };
        newAccount = giro;
        break;
      }

      case AccountType.Spar: {
        const spar: SparAccount = {
          accountNumber: newAccountNumber,
          customerId: this.userId,
          accountType: AccountType.Spar,
          accountBalance: this.accountBalance,
          interestRate: this.FIXED_INTEREST_RATE, // fest 2,5 %
          monthlyDeposit: this.monthlyDeposit,
          goal: this.goal,
        } as SparAccount;
        newAccount = spar;
        break;
      }

      case AccountType.Tagesgeld: {
        const tagesgeld: TagesgeldAccount = {
          accountNumber: newAccountNumber,
          customerId: this.userId,
          accountType: AccountType.Tagesgeld,
          accountBalance: this.accountBalance,
          dailyPayout: this.dailyPayout,
        } as TagesgeldAccount;
        newAccount = tagesgeld;
        break;
      }

      default:
        return;
    }

    console.log('Neues Konto angelegt:', newAccount);
    this.resetForm();
  }

  // ====================
  // 5) Formular zurücksetzen
  // ====================
  private resetForm(): void {
    this.selectedType = null;
    this.accountBalance = NaN;
    this.overdraftLimit = NaN;
    this.pin = '';
    this.monthlyDeposit = NaN;
    this.goal = NaN;
    this.dailyPayout = NaN;
  }
}
