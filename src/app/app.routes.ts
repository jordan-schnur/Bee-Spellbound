import { Routes } from '@angular/router';
import { WordGameComponent } from './word-game/word-game.component';
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {AboutMeComponent} from "./about-me/about-me.component";
import {DifficultySelectComponent} from "./difficulty-select/difficulty-select.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'difficulty-select', component: DifficultySelectComponent },
  { path: 'about', component: AboutComponent },
  { path: 'about-me', component: AboutMeComponent },
  { path: 'game', component: WordGameComponent },
];

