import { Routes } from '@angular/router';
import { WordGameComponent } from './word-game/word-game.component';

export const routes: Routes = [
  { path: '', redirectTo: 'word-game', pathMatch: 'full' },
  { path: 'word-game', component: WordGameComponent }
];
