import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faCoffee, faXmark} from "@fortawesome/free-solid-svg-icons";
import {faGithub, faLinkedin, faTwitter, faXbox} from "@fortawesome/free-brands-svg-icons";


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  fullYear: string = new Date().getFullYear().toString();
  protected readonly faCoffee = faCoffee;
  protected readonly faTwitter = faTwitter;
  protected readonly faXbox = faXbox;
  protected readonly faXmark = faXmark;
  protected readonly faLinkedin = faLinkedin;
  protected readonly faGithub = faGithub;
}
