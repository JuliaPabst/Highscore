import { Injectable } from '@angular/core';
//brauhct http client, http headers, sind injections
//einmal definiert für backendaufruf
//sonst braucht es jede komponente
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router'; // Import Router

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient, private router: Router) { }

  httpOptions = {
    //einmal definiert
    //wiederverwendbar
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  login(email: string, password: string) {
    //wo liegt service
    //Token string: was soll zurückkommen, es soll ein token string kommen
    this.http.post<{ Token: string }>('http://localhost:3000/sessions', { "email": email, "password": password }, this.httpOptions)
    //subscribe: erfolgsfall  
    .subscribe((responseData) => {
        console.log(responseData.Token);
        localStorage.setItem('token', responseData.Token);
        this.router.navigate(['/landing-page']);
      });
  }

  getHighScores() {
    return this.http.get<any[]>('http://localhost:3000/highscores', this.httpOptions);
  }

  signup(email: string, password: string, address: string, city: string, zipCode: string) {
    this.http.post<{ Token: string }>('http://localhost:3000/users', { email, password, address, city, zipCode }, this.httpOptions)
      .subscribe(
        (response) => {
          console.log(response.Token);
          localStorage.setItem('token', response.Token);
          this.router.navigate(['/landing-page']);
          console.log('Signup successful');
        },
        (error) => {
          console.error('Error during signup:', error);
        }
      );
  }

  sendHighscore(username: string, highscore: number) {
    this.http.post<{ message: string }>('http://localhost:3000/highscores', {username, highscore }, this.httpOptions)
      .subscribe(
        (response) => {
          console.log(response.message);
        },
        (error) => {
          console.error('Error sending highscore:', error);
        }
      );
  }

  logout() {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.delete('http://localhost:3000/sessions', {
        headers: new HttpHeaders({ 'Authorization': token })
      }).subscribe(
        () => {
          console.log('Logged out successfully');
          localStorage.removeItem('token');
          this.router.navigate(['/login']); // or wherever you want to redirect after logout
        },
        (error) => {
          console.error('Error logging out:', error);
        }
      );
    }
}


}