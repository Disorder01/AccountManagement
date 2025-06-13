import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {
  user: User | null | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.currentUser;
  }
}
