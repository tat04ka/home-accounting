import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer'
import * as RecordsActions from './record/store/record.actions';
import * as BillActions from './bill/store/bill.actions';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.dispatch(new RecordsActions.GetCategories());
    this.store.dispatch(new BillActions.GetRates());
    this.store.dispatch(new BillActions.GetBill());
  }
}
