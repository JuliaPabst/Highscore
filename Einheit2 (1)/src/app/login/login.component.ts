import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  email = "";
  hide = true;
  isLoading = false;
  loginForm: FormGroup = this.fb.group({
    email: new FormControl(this.email, [
      Validators.required,
      Validators.minLength(4)
    ])
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void { }

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
    }
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.loginForm.controls;
  }
}
