import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from 'src/app/store/app.reducer';
import { User } from '../models/user.model';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  checkUserLoggedIn(): Observable<User> {
    return this.store.select(state => state.auth.user)
      .pipe(map((user: User) => user));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {
    return this.checkUserLoggedIn().pipe(switchMap((user) => {
      if (user) {
        return of(true)
      } else {
       this.router.navigate(['/login'], {
         queryParams: {
           accessDenied: true
         }
       })
      }
    }));
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }

}