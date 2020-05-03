import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecord from '../system/record/store/record.reducer';
import * as fromBill from '../system/bill/store/bill.reducer';

export interface AppState {
  auth: fromAuth.State;
  record: fromRecord.State;
  bill: fromBill.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  record: fromRecord.recordReducer,
  bill: fromBill.billReducer
};