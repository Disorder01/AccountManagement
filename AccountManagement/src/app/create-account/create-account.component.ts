import { Component } from '@angular/core';
import { AccountType } from '../../enums/accountType';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {
  selectedType?: AccountType;
  accountTypes = AccountType;
  accountTypeLabels: Record<AccountType, string> = {
    [AccountType.Giro]: 'Girokonto',
    [AccountType.Spar]: 'Sparkonto',
    [AccountType.Tagesgeld]: 'Tagesgeldkonto'
  };

  get accountTypeValues(): AccountType[] {
    return Object.values(this.accountTypes);
  }
}
