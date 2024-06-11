import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.css']
})
export class HighscoresComponent implements OnInit {
  highScores: any[] = [];
  displayedColumns: string[] = ['username', 'score']; // Define the columns to display

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.getHighScores().subscribe(
      (data) => {
        this.highScores = data;
        console.log(this.highScores);
      },
      (error) => {
        console.error('Error fetching high scores:', error);
      }
    );
  }

  logout() {
    this.backendService.logout();
  }
}
