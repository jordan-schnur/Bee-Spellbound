import {Component, EventEmitter, HostListener, NgZone, Output} from '@angular/core';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.css'
})
export class KeyboardComponent {
  activeKey: string | null = null;
  clicks: HTMLAudioElement[] = [];
  @Output() keyPress = new EventEmitter<string>();

  constructor(private zone: NgZone) { }

  ngOnInit() {
    const clickOne = new Audio('assets/audio/click/click1.mp3');
    const clickTwo = new Audio('assets/audio/click/click2.mp3');
    const clickThree = new Audio('assets/audio/click/click3.mp3');
    const clickFour = new Audio('assets/audio/click/click4.mp3');
    clickOne.load();
    clickTwo.load();
    clickThree.load();
    clickFour.load();

    this.clicks = [
      clickOne,
      clickTwo,
      clickThree,
      clickFour
    ];
  }

  onKeyClick(key: string) {
    this.setActiveKey(key);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.metaKey || event.ctrlKey) return; // Ignore system shortcuts (e.g. ctrl+c

    const validKeyRegex = /^[a-zA-Z]$|^Backspace|^Enter$/;
    if (validKeyRegex.test(event.key)) {
      this.setActiveKey(event.key.toLowerCase());
      event.preventDefault();
    }
  }

  setActiveKey(key: string) {
    this.activeKey = key;
    this.playClick();

    this.keyPress.emit(key);

    this.zone.run(() => {
      setTimeout(() => this.activeKey = null, 100); // Remove class after 100ms
    });
  }

  isKeyActive(key: string) {
    return key === this.activeKey;
  }

  playClick() {
    const click = this.clicks[Math.floor(Math.random() * this.clicks.length)];
    click.play();
  }
}
