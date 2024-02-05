import {Component, ViewContainerRef} from '@angular/core';
import {WordService} from "../word.service";
import {FormsModule} from "@angular/forms";
import {KeyboardComponent} from "../keyboard/keyboard.component";
import {WordComponent} from "../word/word.component";
import {NgForOf} from "@angular/common";
import { DifficultyLevel } from '../difficulty-level.enum';
import {ToastComponent} from "../toast/toast.component";
import {ToastService} from "../toast.service";

@Component({
  selector: 'app-word-game',
  standalone: true,
  imports: [
    FormsModule,
    KeyboardComponent,
    WordComponent,
    NgForOf,
    ToastComponent
  ],
  templateUrl: './word-game.component.html',
  styleUrl: './word-game.component.css'
})
export class WordGameComponent {
  wordToSpell = 'abandon';
  userMessage = '';
  MAX_GUESSES = 5;
  currentTry = 0;
  guesses: string[] = [];
  disablePlayAgain = true;
  isCorrect = false;
  score = 0;
  currentAudio: HTMLAudioElement | undefined;
  DifficultyLevel = DifficultyLevel;
  selectedDifficulty = DifficultyLevel.Easy;

  constructor(private wordService: WordService, private viewContainerRef: ViewContainerRef, private toastService: ToastService) {
    this.toastService.setViewContainerRef(viewContainerRef);
    this.wordToSpell = wordService.getRandomWord(this.selectedDifficulty);
  }

  ngOnInit() {
    this.newWord();
  }

  checkGuess() {
    let currentGuess = this.guesses[this.currentTry];
    console.log("Current Guess: " + currentGuess);
    console.log("Comparing %s to %s", this.wordToSpell, currentGuess);
    if (this.wordToSpell.toLowerCase() === currentGuess) {
      this.userMessage = 'Correct! Good job!';
      this.isCorrect = true;
      this.disablePlayAgain = false;
      this.score += (this.MAX_GUESSES - this.currentTry) * this.getScoreModifier();
      if (this.currentAudio) {
        this.currentAudio.pause();
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
    this.wordToSpell = this.wordService.getRandomWord(this.selectedDifficulty);
    this.setupGuesses();
    this.isCorrect = false;
    this.disablePlayAgain = true;
    this.currentTry = 0;
    this.playAudio();
  }

  public setupGuesses() {
    this.guesses = [];
    for (let i = 0; i < this.MAX_GUESSES; i++) {
      this.guesses.push('');
    }
  }

  playAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
    }

    this.currentAudio = new Audio();
    this.currentAudio.src = "assets/audio/words/" + this.wordToSpell + ".mp3";
    this.currentAudio.load();
    this.currentAudio.play();
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
