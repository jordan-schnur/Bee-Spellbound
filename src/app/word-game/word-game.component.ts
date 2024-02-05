import {Component, EventEmitter, ViewChild, ViewContainerRef} from '@angular/core';
import {WordService} from "../word.service";
import {FormsModule} from "@angular/forms";
import {KeyboardComponent} from "../keyboard/keyboard.component";
import {WordComponent} from "../word/word.component";
import {NgForOf} from "@angular/common";
import { DifficultyLevel } from '../difficulty-level.enum';
import {ToastComponent} from "../toast/toast.component";
import {ToastService} from "../toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AudioPlayerComponent} from "../audio-player/audio-player.component";

@Component({
  selector: 'app-word-game',
  standalone: true,
  imports: [
    FormsModule,
    KeyboardComponent,
    WordComponent,
    NgForOf,
    ToastComponent,
    AudioPlayerComponent
  ],
  templateUrl: './word-game.component.html',
  styleUrl: './word-game.component.css'
})
export class WordGameComponent {
  wordToSpell = '';
  userMessage = '';
  MAX_GUESSES = 5;
  currentTry = 0;
  guesses: string[] = [];
  disablePlayAgain = true;
  isCorrect = false;
  score = 0;
  currentAudio: HTMLAudioElement | undefined;
  selectedDifficulty: DifficultyLevel | null = null;
  @ViewChild(AudioPlayerComponent) audioPlayerComponent!: AudioPlayerComponent;

  constructor(private wordService: WordService, private viewContainerRef: ViewContainerRef, private toastService: ToastService, private route: ActivatedRoute, private router: Router) {
    this.toastService.setViewContainerRef(viewContainerRef);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['difficulty'] === undefined) {
        this.router.navigate(['/difficulty-select']).then(r => console.log("Navigated to difficulty-select"));
        return;
      }
      this.selectedDifficulty = params['difficulty'];
      this.newWord();
    });
  }

  checkGuess() {
    let currentGuess = this.guesses[this.currentTry];
    if (this.wordToSpell.toLowerCase() === currentGuess) {
      this.userMessage = 'Correct! Good job!';
      this.isCorrect = true;
      this.disablePlayAgain = false;
      this.score += (this.MAX_GUESSES - this.currentTry) * this.getScoreModifier();
      if (this.audioPlayerComponent) {
        this.audioPlayerComponent.pauseAudio();
      }
    } else {
      if (this.currentTry === this.MAX_GUESSES - 1) {
        this.userMessage = 'Sorry, the word was ' + this.wordToSpell;
        this.disablePlayAgain = false;
        this.currentTry++;
        return;
      }
      this.userMessage = 'Try again!';
      this.currentTry++;
    }
  }

  getScoreModifier() {
    return this.selectedDifficulty === DifficultyLevel.Easy ? 1 : this.selectedDifficulty === DifficultyLevel.Medium ? 2 : 3;
  }

  newWord() {
    if (this.selectedDifficulty === null) {
      return;
    }

    this.wordToSpell = this.wordService.getRandomWord(this.selectedDifficulty);
    this.setupGuesses();
    this.isCorrect = false;
    this.disablePlayAgain = true;
    this.currentTry = 0;
  }

  public setupGuesses() {
    this.guesses = [];
    for (let i = 0; i < this.MAX_GUESSES; i++) {
      this.guesses.push('abcxyzm');
    }
  }

  playAudio() {
    if (this.audioPlayerComponent) {
      this.audioPlayerComponent.playAudioFromStart();
    }
  }

  ngAfterViewInit() {
    this.playAudio();
  }

  handleKeyPress(key: string) {
    let currentGuess = this.guesses[this.currentTry];
    if (key === "backspace") {
      this.guesses[this.currentTry] = currentGuess.slice(0, -1);
      return;
    }

    if (key === "enter") {
      if (this.isCorrect) {
        this.newWord();
        return;
      }

      if (currentGuess.length === 0) {
        this.toastService.showToast("You haven't guessed anything!");
          return;
      }

      if (currentGuess.length < this.wordToSpell.length) {
          this.toastService.showToast("You haven't guessed the whole word!");
          return;
      }

      let sameAsPrevious = this.guesses.filter((guess) => guess === currentGuess).length > 1;
        if (sameAsPrevious) {
           this.toastService.showToast("You already guessed that!");
            return;
        }

      this.checkGuess();
      return;
    }

    if (currentGuess.length >= this.wordToSpell.length) {
      return;
    }

    this.guesses[this.currentTry] = currentGuess + key;
  }

  showToast() {
    this.toastService.showToast(this.wordToSpell);
  }
}
