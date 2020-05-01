import { Component, OnInit, OnDestroy } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';

import { AccountService } from '../shared/services/account.service';
import { Account } from '../shared/models/account.model';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  refreshSubscription: Subscription;
  account: Account;
  usdRate: number;
  eurRate: number;
  isLoaded = false;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.subscription = forkJoin(
      this.accountService.getAccount(),
      this.accountService.getExchangeRates('USD'),
      this.accountService.getExchangeRates('EUR')
    ).subscribe(([account, usd, eur]) => {
      this.account = account;
      this.usdRate = usd;
      this.eurRate = eur;
      this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  refresh() {
    this.isLoaded = false;
    this.refreshSubscription = forkJoin(
      this.accountService.getExchangeRates('USD'),
      this.accountService.getExchangeRates('EUR')
    ).subscribe(([usd, eur]) => {
      this.usdRate = usd;
      this.eurRate = eur;
      this.isLoaded = true;
    });
    
  }

}
