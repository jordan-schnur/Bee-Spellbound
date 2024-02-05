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
    console.log("Easy: %s", this.wordService.getRandomWord(DifficultyLevel.Easy));
    console.log("Medium %s", this.wordService.getRandomWord(DifficultyLevel.Medium));
    console.log("Hard: %s", this.wordService.getRandomWord(DifficultyLevel.Hard));
  }

  selectDifficulty(difficulty: DifficultyLevel) {
    console.log("Selected difficulty: " + difficulty);
    this.router.navigate(['/game'], { queryParams: { difficulty } });
  }
}
