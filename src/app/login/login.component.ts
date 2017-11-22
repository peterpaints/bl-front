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
  current_user: string;
  res;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
  }

  public login(email, password) {
    this.api
      .logUserIn(email, password)
      .subscribe(response => {
        this.res = response;
        if (this.res.message === 'You logged in successfully.') {
          if (this.res.access_token) {
            // console.log(this.res.access_token);
            this.access_token = this.res.access_token;
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
