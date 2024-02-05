import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCircleArrowUp, faPause, faPlay, faPlayCircle, faReply} from "@fortawesome/free-solid-svg-icons";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [
    FormsModule,
    FaIconComponent,
    NgIf
  ],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss'
})
export class AudioPlayerComponent {
  @Input() audioUrl!: string;
  currentAudio: HTMLAudioElement;
  currentTime: number = 0;
  updateTimer: any;
  isPlaying: boolean = false;
  allowSeek: boolean = false;

  constructor() {
    this.currentAudio = new Audio();
  }

  ngOnInit() {
    if (this.currentAudio) {
      this.currentAudio.pause();
    }

    this.currentAudio = new Audio();
    this.currentAudio.src = this.audioUrl;
    this.currentAudio.load();
    this.updateTimer = setInterval(() => {
      if (this.allowSeek) {
        return;
      }

      if (this.currentAudio.ended) {
        this.isPlaying = false;
        this.currentTime = 0;
        this.currentAudio.currentTime = 0;
        this.currentAudio.pause();
        return;
      }

      this.currentTime = this.currentAudio.currentTime;
    }, 250);
  }

  ngOnDestroy() {
    if (this.currentAudio) {
      this.currentAudio.pause();
    }

    if (this.updateTimer) {
      clearInterval(this.updateTimer);
    }
  }
  changeAudio(event: any) {
    this.currentTime = event.target.value;
    this.currentAudio.currentTime = this.currentTime;
  }

  onPointerDown(event: any) {
    this.allowSeek = true;
  }

  onPointerUp(event: any) {
    this.allowSeek = false;
  }

  toggleAudio() {
    if (this.currentAudio.paused) {
      this.currentAudio.play();
      this.isPlaying = true;
      this.currentTime = this.currentAudio.currentTime;
    } else {
      this.currentAudio.pause();
      this.isPlaying = false;
      this.currentTime = this.currentAudio.currentTime;
    }
  }

  pauseAudio() {
    this.currentAudio.pause();
    this.isPlaying = false;
    this.currentTime = this.currentAudio.currentTime;
  }

  playAudioFromStart() {
    this.resetAudio();
    this.isPlaying = true;
    this.currentTime = 0;
    this.currentAudio.currentTime = 0;
    this.currentAudio.play();
    console.log("Playing audio from start")
  }

  resetAudio() {
    this.currentTime = 0;
    this.currentAudio.currentTime = 0;
  }

  formatSeconds(seconds: number) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    if (remainingSeconds < 10) {
      return minutes + ':0' + Math.floor(remainingSeconds);
    }

    return minutes + ':' + Math.floor(remainingSeconds);
  }

  protected readonly faPlay = faPlay;
  protected readonly faPause = faPause;
  protected readonly faReply = faReply;
}
