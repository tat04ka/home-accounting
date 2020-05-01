import { User } from '../models/user.model';

export class AuthService {
  private isAuthenticated = false;

  login(user: User) {
    this.isAuthenticated = true;
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.isAuthenticated = false;
    window.localStorage.clear();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}