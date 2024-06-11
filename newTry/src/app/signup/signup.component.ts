import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { BackendService } from '../backend.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  hide = true;
  isLoading = false;
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private backendService: BackendService) { 
    this.signupForm = this.fb.group({
      email: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.email
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(4)
      ]),
      confirmPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(4)
      ]),
      company: new FormControl({ value: 'FH Technikum Wien', disabled: false }),
      street: new FormControl("", [
      ]),
      city: new FormControl("", [
      ]),
      postalCode: new FormControl("", [
        Validators.pattern('^[0-9]{4}$')
      ])
    }, { validators: this.mustMatch('password', 'confirmPassword') });
  }

  ngOnInit(): void { }

  signup() : void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.backendService.signup(
        this.form["email"].value,
        this.form["password"].value,
        this.form["street"].value,
        this.form["city"].value,
        this.form["postalCode"].value
      )
    } else {
      console.log("Signup failed.");
    }
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.signupForm.controls;
  }

  mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const formControl = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return null;
      }

      // set error on matchingControl if validation fails
      if (formControl.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        matchingControl.setErrors(null);
        return null;
      }
    };
  }
}
