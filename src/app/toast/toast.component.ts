import { Component, Input } from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  imports: [
    NgIf,
    NgClass
  ],
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  @Input() message: string = '';
  show: boolean = false;
  entering: boolean = true;
  exiting: boolean = false;

  display(message: string) {
    this.message = message;
    this.show = true;
    this.entering = true;
    setTimeout(() => this.entering = false, 500); // Duration of the entry animation
    setTimeout(() => this.exiting = true, 4000); // Duration before starting the exit animation
  }

  close() {
    this.show = false;
  }
}
