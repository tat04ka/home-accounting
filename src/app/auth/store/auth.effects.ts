import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as AuthActions from './auth.actions';
import { BaseApi } from 'src/app/shared/core/base.api';
import { User } from 'src/app/shared/models/user.model';

@Injectable()
export class AuthEffects extends BaseApi{
  constructor(
    private actions$: Actions,
    public http: HttpClient,
    private router: Router) {
    super(http);
  }

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.get(`users?email=${authData.payload.email}`)
        .pipe(
          map((users: User[]) => {
            const user = users[0];
            if (user) {
              if (user.password !== authData.payload.password) {
                return new AuthActions.LoginFail('Incorrect password');
              } else {
                window.localStorage.setItem('name', user.name);
                return new AuthActions.Login(user);
              }
            } else {
              return new AuthActions.LoginFail('User doesn\'t exist');
            }
          })
        );
    })
  );

  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => { this.router.navigate(['/system', 'bill']); })
  );

  @Effect()
  signupStart = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signUpData: AuthActions.SignupStart) => {
      return this.post('users', signUpData.payload)
        .pipe(map(() => {
          return new AuthActions.SignupFinish();
        }));
    })
  );

  @Effect({dispatch: false})
  signupFinish = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_FINISH),
    tap(() => {
      this.router.navigate(['/login'], {
        queryParams: {
          canLogin: true
        }
      });
    })
  );

  @Effect({dispatch: false})
  logout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      window.localStorage.clear();
      this.router.navigate(['/login']);
    })
  );
  
}
