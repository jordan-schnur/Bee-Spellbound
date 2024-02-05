import {Component, Input, SimpleChanges} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-word',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './word.component.html',
  styleUrl: './word.component.css'
})
export class WordComponent {
  @Input() wordToSpell: string = ''; // Current state of the word
  @Input() userGuess!: string;
  @Input() shouldScore: boolean = false;

  tileClasses: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.tileClasses = [];
    if (changes['shouldScore'] && this.shouldScore) {
      this.scoreGuess();
    }
  }

  private scoreGuess(): void {
    let results: string[] = [];

    results = this.wordToSpell.split('').map((letter, index) => {
      let guessedLetter = this.userGuess[index];

      if (guessedLetter === undefined) {
        return 'empty';
      } else if (guessedLetter === letter) {
        return 'correct';
      } else if (this.wordToSpell.includes(guessedLetter)) {
        // count the number of times the guessed letter appears in the word
        let count = this.wordToSpell.split(guessedLetter).length - 1;

        // count the number of times we have already guessed the letter from this point in the word
        let guessedCount = this.userGuess.slice(0, index + 1).split(guessedLetter).length - 1;
        // if we have guessed the letter more times than it appears in the word, it is invalid
        if (guessedCount > count) {
          return 'invalid';
        } else {
          return 'present';
        }
      }

      return "invalid"
    });

    this.tileClasses = results;
  }
}
