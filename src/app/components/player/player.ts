import {Component, Input} from 'angular2/core';

@Component({
  selector: 'player',
  inputs: ['toPlayer'],
  styles: [ require('./player.scss') ],
  template: require('./player.jade')
})
export class Player {
  toPlayer: toPlayer;
  coors_proxy: string;
  context: any;
  source: any;

  constructor() {
    this.coors_proxy = 'https://crossorigin.me/';
    this.context = new AudioContext();
    this.source;
  }

  play() {
    if (this.isPlaying()) this.stop();
    let request = new XMLHttpRequest();
    request.open('GET', this.coors_proxy + this.toPlayer.url, true);
    console.log(this.toPlayer.url);
    request.responseType = 'arraybuffer';
    request.onload = () => {
      this.context.decodeAudioData(request.response, (decodedBuffer) => {
        this.source = this.context.createBufferSource();
        this.source.buffer = decodedBuffer;
        this.source.connect(this.context.destination);
        this.source.start(0);
      });
    }
    request.send();
  }

  stop() {
    this.source.stop();
  }

  private isPlaying() {
    return this.source && this.source.playbackState === this.source.PLAYING_STATE;
  }
};

class toPlayer {
  constructor(
    public url: string,
    public artwork_url: string,
    public description: string
  ) {}
}
