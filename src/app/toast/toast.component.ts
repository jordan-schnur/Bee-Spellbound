import { Component, Input } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  @Input() message: string = '';
  show: boolean = false;

  display(message: string) {
    this.message = message;
    this.show = true;
    setTimeout(() => this.show = false, 5000); // Hide after 5 seconds
  }

  close() {
    this.show = false;
  }
}
