import {Component} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {DifficultyLevel} from "../difficulty-level.enum";
import {WordService} from "../word.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  DifficultyLevel = DifficultyLevel;

  constructor(private router: Router, private wordService: WordService) {
  }

  selectDifficulty(difficulty: DifficultyLevel) {
    this.router.navigate(['/game'], { queryParams: { difficulty } });
  }
}
