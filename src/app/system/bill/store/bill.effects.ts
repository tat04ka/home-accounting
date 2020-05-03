import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import { BaseApi } from 'src/app/shared/core/base.api';
import * as BillActions from './bill.actions';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class BillEffects extends BaseApi {
  currconvApiKey = '23e41fa4288cf5491b1c';
  currconvAddress = 'https://free.currconv.com/api/v7/convert';

  constructor(private actions$: Actions, public http: HttpClient) {
    super(http);
  }

  @Effect()
  getBill = this.actions$.pipe(
    ofType(BillActions.GET_BILL),
    switchMap(() => {
      return this.get('account').pipe(
        map((account) => {
          return new BillActions.SetBill(account.value);
        }))
    })
  );

  @Effect()
  getRates = this.actions$.pipe(
    ofType(BillActions.GET_RATES),
    switchMap(() => {
      return this.http.get(`${this.currconvAddress}?q=USD_UAH,EUR_UAH&compact=ultra&apiKey=${this.currconvApiKey}`)
        .pipe(
          map((rates: {'USD_UAH': number, 'EUR_UAH': number}) => {
            return new BillActions.SetRates(rates);
          })
        );
    })
  );

  @Effect()
  updateBill = this.actions$.pipe(
    ofType(BillActions.UPDATE_BILL),
    switchMap((billData: BillActions.UpdateBill) => {
      return this.put('account', {value: billData.payload}).pipe(
        map((account) => {
          return new BillActions.SetBill(account.value);
        }))
    })
  );
}