import { Component, OnInit } from '@angular/core';
import { ApiService } from '../apiservice.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  users: User[] = [];
  email: string = '';
  password: string = '';
  confirm_password: string ='';
  message: any = '';
  error: string = '';
  access_token: string = '';
  login_status: boolean;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
  }

  public register(email, password, confirm_password) {
    if (password !== confirm_password) {
      this.error = 'Passwords don\'t match';
      alert(this.error);
    } else {
      this.api.registerUser(email, password)
      .subscribe(response =>
        this.message = response,
        error => alert(error['message'])
      );
    }
    if (this.message.json()['message'] === 'You registered successfully. Please log in.') {
      this.router.navigate(['/login']);
    }
  }
}
