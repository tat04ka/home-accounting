import { Action } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const SIGNUP_FINISH = '[Auth] Signup Finish';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: User) {}
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: {email: string, password: string}) {}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: User) {}
}

export class SignupFinish implements Action {
  readonly type = SIGNUP_FINISH;
}

export type AuthActions = Login | LoginStart | LoginFail | Logout | SignupStart | SignupFinish;
