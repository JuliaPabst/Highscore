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

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private fb: FormBuilder, private backendService: BackendService) {}

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password1 = control.get('password1');
    const password2 = control.get('password2');

    return password1 && password2 && password1.value !== password2.value
      ? { passwordMismatch: true }
      : null;
  };

  hide = true;
  isLoading = false;
  signupFailed = false;
  signupForm: FormGroup = this.fb.group(
    {
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.email,
      ]),
      password1: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      password2: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required)
    },
    { validators: this.passwordMatchValidator }
  );

  ngOnInit(): void {}

  signup(): void {
    if (this.signupForm.invalid) {
      this.signupFailed = true;
      return;
    }

    this.isLoading = true;
    console.log('Signup successful.');
    this.signupFailed = false;

    const formData = this.signupForm.value;

    this.backendService.signup(formData).subscribe(
      response => {
        console.log('Signup response:', response);
        this.isLoading = false;
        // Handle successful signup (e.g., redirect to login page)
      },
      error => {
        console.error('Signup error:', error);
        if (error.status === 409) {
          this.signupFailed = true;
          // Handle user already exists case
          alert('User already exists. Please use a different email.');
        } else {
          this.signupFailed = true;
          // Handle other errors
          alert('An error occurred. Please try again.');
        }
        this.isLoading = false;
      }
    );
  }

  get form(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  get passwordMismatch(): boolean {
    return this.signupForm.hasError('passwordMismatch');
  }
}
