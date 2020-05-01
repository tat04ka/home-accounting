import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { BaseApi } from '../core/base.api';

@Injectable()
export class UsersService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.get(`users?email=${email}`)
      .pipe(map((users: User[]) => users[0] ? users[0] : undefined));
  }

  addUser(user: User): Observable<User> {
    return this.post('users', user);
  }
}