import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as BillActions from './store/bill.actions';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  account: number;
  usdRate: number;
  eurRate: number;
  isLoaded = false;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select('bill').subscribe(billState => {
      if (billState.account && billState.usdRate && billState.eurRate) {
        this.account = billState.account;
        this.usdRate = billState.usdRate;
        this.eurRate = billState.eurRate;
        this.isLoaded = true;
      }
    });
  }

  refresh() {
    this.isLoaded = false;
    this.store.dispatch(new BillActions.GetRates());
  }
}
