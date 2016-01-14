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

  constructor() {
    this.coors_proxy = 'https://crossorigin.me/';
    this.context = new AudioContext();
  }

  play() {
    let request = new XMLHttpRequest();
    request.open('GET', this.coors_proxy + this.toPlayer.url, true);
    console.log(this.toPlayer.url);
    request.responseType = 'arraybuffer';
    request.onload = () => {
      this.context.decodeAudioData(request.response, (decodedBuffer) => {
        let source = this.context.createBufferSource();
        source.buffer = decodedBuffer;
        source.connect(this.context.destination);
        source.start(0);
        console.log('started audio');
      });
    }
    request.send();
  }

  // prepare_buffer(response: any): void {
  //   this.context.decodeAudioData(response, (decodedBuffer) => {
  //     let source = this.context.createBufferSource();
  //     source.buffer = decodedBuffer;
  //     source.connect(this.context.destination);
  //     source.start(0);
  //   });
  // }
};

class toPlayer {
  constructor(
    public url: string,
    public artwork_url: string,
    public description: string
  ) {}
}
