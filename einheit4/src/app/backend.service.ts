import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  login(email: string, password: string) {
    this.http.post<{ Token: string }>('http://localhost:3000/login', { "email": email, "password": password }, this.httpOptions)
      .subscribe((responseData) => {
        console.log(responseData.Token);
      });
  }
}
