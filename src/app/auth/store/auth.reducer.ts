import { User } from 'src/app/shared/models/user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string
}

const initialState: State = {
  user: null,
  authError: null
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.LOGIN:
      return {
        ...state,
        user: action.payload,
        authError: null
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
    case AuthActions.SIGNUP_FINISH:
      return {
        ...state,
        authError: null
      };
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload
      }
    default:
      return state;
  }
}