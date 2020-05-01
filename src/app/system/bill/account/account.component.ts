import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../../shared/models/account.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @Input() account: Account;
  @Input() usdRate: number;
  @Input() eurRate: number;

  constructor() { }

  ngOnInit() {
  }

}
