import { Action } from '@ngrx/store';

export const GET_BILL = '[Bill] Get Bill';
export const SET_BILL = '[Bill] Set Bill';
export const UPDATE_BILL = '[Bill] Update Bill';
export const GET_RATES = '[Bill] Get Rates';
export const SET_RATES = '[Bill] Set Rates';

export class GetBill implements Action {
  readonly type = GET_BILL;
}

export class SetBill implements Action {
  readonly type = SET_BILL;

  constructor(public payload: number) {}
}

export class UpdateBill implements Action {
  readonly type = UPDATE_BILL;

  constructor(public payload: number) {}
}

export class GetRates implements Action {
  readonly type = GET_RATES;
}

export class SetRates implements Action {
  readonly type = SET_RATES;

  constructor(public payload: {'USD_UAH': number, 'EUR_UAH': number}) {}
}

export type BillActions = GetBill | SetBill | UpdateBill | GetRates | SetRates;