import * as BillActions from '../store/bill.actions';

export interface State {
  account: number,
  usdRate: number,
  eurRate: number
}

const initialState: State = {
  account: 0,
  usdRate: 0,
  eurRate: 0
}

export function billReducer(state = initialState, action) {
  switch(action.type) {
    case BillActions.GET_BILL:
    case BillActions.GET_RATES:
    case BillActions.UPDATE_BILL:
      return {
        ...state
      };
    case BillActions.SET_BILL:
      return {
        ...state,
        account: action.payload
      }
    case BillActions.SET_RATES:
      return {
        ...state,
        usdRate: action.payload.USD_UAH,
        eurRate: action.payload.EUR_UAH
      }
    default:
      return state;
  }
}