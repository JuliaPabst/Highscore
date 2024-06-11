import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder, AbstractControl } from '@angular/forms';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  isLoading = false;
  loginForm: FormGroup = this.fb.group({
    email: new FormControl("", [
      Validators.required,
      Validators.minLength(4)
    ]),
    password: new FormControl("", [
      Validators.required
    ])
  });

  constructor(private fb: FormBuilder, private backendService: BackendService) { }
  //Backendservice über konstruktor
  //service injected

  ngOnInit(): void { }

  //kann hier unit test schrieben
  login(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      //dependency injection
      //kann hier mockup machen lassen

      //vom injizierten service die login komponente
      this.backendService.login(
        this.form["email"].value, 
        this.form["password"].value);
    }
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.loginForm.controls;
  }
}
