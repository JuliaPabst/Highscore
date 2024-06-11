import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { zip } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private fb: FormBuilder, private backendService: BackendService) { }

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password1 = control.get('password1');
    const password2 = control.get('password2');

    return password1 && password2 && password1.value !== password2.value
      ? { passwordMismatch: true }
      : null;
  };

  email = '';
  password1 = '';
  password2 = '';
  hide = true;
  isLoading = false;
  signupFailed = false;

  signupForm: FormGroup = this.fb.group(
    {
      email: new FormControl(this.email, [
        Validators.required,
        Validators.minLength(4),
        Validators.email,
      ]),
      password1: new FormControl(this.password1, [
        Validators.required,
        Validators.minLength(8),
      ]),
      password2: new FormControl(this.password2, [
        Validators.required,
        Validators.minLength(8),
      ]),
      company: new FormControl({ value: 'FH Technikum Wien', disabled: false }),
      address: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      zipCode: new FormControl("", [
        Validators.pattern('^[0-9]{4}$'), Validators.required
      ])
    },
    { validators: this.passwordMatchValidator }
  );

  ngOnInit(): void {}

  signup() {
    const emailControl = this.signupForm.get('email');
    const password1Control = this.signupForm.get('password1');
    const password2Control = this.signupForm.get('password2');
   
    if (
      emailControl?.errors?.['required'] ||
      password1Control?.errors?.['required'] ||
      password2Control?.errors?.['required']
    ) {
      this.signupFailed = true;
    } 

    if (this.signupForm.valid) {
      this.isLoading = true;
      this.signupFailed = false;

      console.log('Signup successful.');
      console.log(this.form["email"].value);
      console.log(this.form["address"].value);
      console.log(this.form["zipCode"].value);

      this.backendService.signup(
        this.form["email"].value,
        this.form["password1"].value,
        this.form["address"].value,
        this.form["city"].value,
        this.form["zipCode"].value
        )
      
    } else {
      console.log('Signup failed.');
      this.signupFailed = true;
    }
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.signupForm.controls;
  }

  get passwordMismatch(): boolean {
    return this.signupForm.hasError('passwordMismatch');
  }
}
