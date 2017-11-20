import { Component, OnInit } from '@angular/core';
import { ApiService } from '../apiservice.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  users: User[] = [];
  email: string = '';
  password: string = '';
  confirm_password: string ='';
  access_token: string = '';
  login_status: boolean;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
  }

  public login(email, password) {
    this.api
      .logUserIn(email, password)
      .subscribe(response => {
        const res = response;
        if (res.json()['message'] === 'You logged in successfully.') {
          if ((res.json()['access_token'])) {
            this.access_token = res.json()['access_token'];
            localStorage.setItem('access_token', this.access_token);
            localStorage.setItem('login_status', JSON.stringify(this.login_status = true));
            localStorage.setItem('current_user', email);
            this.router.navigate(['/dashboard']);
          }
        } else {
          localStorage.setItem('login_status', JSON.stringify(this.login_status = false));
          localStorage.setItem('current_user', null);
          this.router.navigate(['/login']);
        }
      },
        error => {alert(error['message']);
      });
  }
}
