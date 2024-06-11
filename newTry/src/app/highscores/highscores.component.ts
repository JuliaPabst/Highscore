import { Component } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.css']
})
export class HighscoresComponent {
  constructor(private backendService: BackendService, private router: Router) { }

  logout() {
    this.backendService.logout();
  }
}
