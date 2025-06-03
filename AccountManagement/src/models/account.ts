import { AccountType } from "../enums/accountType";

export interface Account {
    accountNumber: number;
    customerId: number;
    accountType: AccountType;
    accountBalance: number;
}

export interface GiroAccount extends Account {
    accountType: AccountType.Giro;
    overdraftLimit: number;
}

export interface SparAccount extends Account {
    accountType: AccountType.Spar;
    interestRate: number;
}

export interface TagesgeldAccount extends Account {
  accountType: AccountType.Tagesgeld;
  interestRate: number;
}