import { Component } from '@angular/core';
import {IsActiveMatchOptions, Router, RouterLink, RouterOutlet} from '@angular/router';
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
  navBarOpen = false;

  constructor(private readonly router: Router) {}

  isActive(url: string): boolean {
    return this.router.isActive(url, {paths: 'exact', queryParams: 'ignored', fragment: 'ignored', matrixParams: 'ignored'} as IsActiveMatchOptions);
  }

  toggleNavBar() {
    this.navBarOpen = !this.navBarOpen;
  }
}
