import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  date: Date = new Date();
  name: string;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.name = window.localStorage.getItem('name');
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
