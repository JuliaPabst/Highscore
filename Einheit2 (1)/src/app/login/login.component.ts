import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  hide = true;
  isLoading = false;
  loginForm: FormGroup = this.fb.group({
    email: new FormControl(this.email, [
      Validators.required,
      Validators.minLength(4),
      Validators.email,
      Validators.pattern('test@test.at'),
    ]),
    password: new FormControl(this.password, [
      Validators.required,
      Validators.pattern('12345678'),
    ]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      console.log('Login successful.');
    } else {
      console.log('Login failed.');
    }
  }

  get form(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
}
