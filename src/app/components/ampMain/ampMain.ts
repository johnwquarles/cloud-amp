import {Component} from 'angular2/core';
import {Queue} from '../queue/queue';
import {UrlInput} from '../urlInput/urlInput';
import {Player} from '../player/player';

@Component({
  styles: [ require('./ampMain.scss') ],
  directives: [Queue, UrlInput, Player],
  template: require('./ampMain.jade')
})
export class AmpMain {
  trackToAdd: Object;
  sendToPlayer: Object;

  constructor() {
    this.sendToPlayer = {
      artwork_url: '',
      url: '',
      title: ''
    };
  }

  addToQueue($event: Object) {
    console.log(`received event: ${JSON.stringify($event)}`);
    this.trackToAdd = $event;
  }

  sendTrackToPlayer($event: Object) {
    console.log(`will send to player: ${JSON.stringify($event)}`);
    this.sendToPlayer = $event;
  }
}
