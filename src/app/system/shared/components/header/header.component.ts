import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  date: Date = new Date();
  isDropdownOpened = false;
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  toggleDropdown() {
    this.isDropdownOpened = !this.isDropdownOpened;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
