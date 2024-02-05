import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {WordGameComponent} from "./word-game/word-game.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WordGameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Bee Spellbound';
}
