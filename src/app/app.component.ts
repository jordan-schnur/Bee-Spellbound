import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {WordGameComponent} from "./word-game/word-game.component";
import {DifficultyLevel} from "./difficulty-level.enum";
import {FooterComponent} from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WordGameComponent, RouterLink, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Bee Spellbound';
}
