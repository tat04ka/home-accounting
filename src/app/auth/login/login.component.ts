import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { Message } from 'src/app/shared/models/message.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(private route: ActivatedRoute, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.message = new Message('', 'danger');
    this.store.select('auth').subscribe(authState => {
      if (authState.authError) {
        this.showMessage(new Message(authState.authError, 'danger'));
      }
    });
    this.route.queryParams.subscribe((params: Params) => {
      if (params['canLogin']) {
        this.showMessage(new Message('Please log in', 'success'));
      }
      if (params['accessDenied']) {
        this.showMessage(new Message('Please log in to start working', 'danger'));
      }
    });
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = ''
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;
    this.store.dispatch(new AuthActions.LoginStart({email: formData.email, password: formData.password}));
  }
}
