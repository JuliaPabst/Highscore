import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  highscores: any[] = [];

  highscoreForm!: FormGroup; // Use non-null assertion operator

  constructor(private fb: FormBuilder, private backendService: BackendService) {
    this.highscoreForm = this.fb.group({
      highscore: ['', Validators.required],
      username: ['', Validators.required]
    });
  }

  logout() {
    this.backendService.logout

  }
  getHighScores() {
    this.backendService.getHighScores().subscribe(
      (highscores) => {
        this.highscores = highscores;
      },

    )
  }

  sendHighscore(): void {
    if (this.highscoreForm && this.highscoreForm.valid) { // Check if highscoreForm is not null
      const highscore = this.highscoreForm.get('highscore')!.value; // Use non-null assertion operator
      const username = this.highscoreForm.get('username')!.value; // Use non-null assertion operator
      this.backendService.sendHighscore(username, highscore);
    }
  }
}
