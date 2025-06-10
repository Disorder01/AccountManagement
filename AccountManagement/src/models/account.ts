import { AccountType } from "../enums/accountType";

export interface Account {
  accountNumber: number;
  customerId: number;
  accountType: AccountType;
  accountBalance: number;
  
  overdraftLimit?: number;
  pin?: string;
  interestRate?: number;
  monthlyDeposit?: number;
  goal?: number;
  dailyPayout?: number;
}

export interface GiroAccount extends Account {
  accountType: AccountType.Giro;
  overdraftLimit: number;
  pin: string;              
}

export interface SparAccount extends Account {
  accountType: AccountType.Spar;
  interestRate: number;
  monthlyDeposit: number;    
  goal: number;            
}

export interface TagesgeldAccount extends Account {
  accountType: AccountType.Tagesgeld;
  dailyPayout: number;
}
