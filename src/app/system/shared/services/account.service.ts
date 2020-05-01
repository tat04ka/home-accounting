import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Account } from '../models/account.model';
import { BaseApi } from 'src/app/shared/core/base.api';

@Injectable()
export class AccountService extends BaseApi {
  currconvApiKey = '23e41fa4288cf5491b1c';
  currconvAddress = 'https://free.currconv.com/api/v7/convert';

  constructor(public http: HttpClient) {
    super(http);
  }

  getAccount(): Observable<Account> {
    return this.get('account');
  }

  updateAccount(value: Account): Observable<Account> {
    return this.put('account', value);
  }

  getExchangeRates(baseCurrency: string, mainCurrency: string = 'UAH'): Observable<number> {
    return this.http.get(`${this.currconvAddress}?q=${baseCurrency}_${mainCurrency}&compact=ultra&apiKey=${this.currconvApiKey}`)
      .pipe(map((rate: object) => {
        return rate[`${baseCurrency}_${mainCurrency}`];
      }));
  }
}