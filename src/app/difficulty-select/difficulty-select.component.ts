import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { DifficultyLevel } from '../difficulty-level.enum';

@Component({
  selector: 'app-difficulty-select',
  standalone: true,
  imports: [],
  templateUrl: './difficulty-select.component.html',
  styleUrl: './difficulty-select.component.css'
})
export class DifficultySelectComponent {
  DifficultyLevel = DifficultyLevel;

  constructor(private router: Router) {
  }

  selectDifficulty(difficulty: DifficultyLevel) {
    this.router.navigate(['/game'], {queryParams: {difficulty: difficulty}});
  }
}
