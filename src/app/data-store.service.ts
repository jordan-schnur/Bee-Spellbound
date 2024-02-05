import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private scoreKey = 'userScore';
  private streakKey = 'userStreak';
  private lastDayKey = 'lastDay';
  private previousDifficultyKey = 'previousDifficulty';
  private versionKey = 1;

  saveScore(score: number): void {
    localStorage.setItem(this.scoreKey, JSON.stringify(score));
  }

  getScore(): number {
    return JSON.parse(localStorage.getItem(this.scoreKey) || '0');
  }

  saveStreak(streak: number): void {
    localStorage.setItem(this.streakKey, JSON.stringify(streak));
  }

  getStreak(): number {
    return JSON.parse(localStorage.getItem(this.streakKey) || '0');
  }

  getPreviousDifficulty(): string {
    return JSON.parse(localStorage.getItem(this.previousDifficultyKey) || 'easy');
  }

  savePreviousDifficulty(difficulty: string): void {
    localStorage.setItem(this.previousDifficultyKey, JSON.stringify(difficulty));
  }
}
