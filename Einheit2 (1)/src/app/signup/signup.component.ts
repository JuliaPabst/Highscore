import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  email = '';
  hide = true;
  isLoading = false;
  signupForm: FormGroup = this.fb.group({
    email: new FormControl(this.email, [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  login() {
    if (this.signupForm.valid) {
      this.isLoading = true;
    }
  }

  get form(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }
}
