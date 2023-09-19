import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
  }

  playSound(soundPath: string) {
    this.audio.src = soundPath;
    this.audio.load();
    this.audio.play();
  }
}
