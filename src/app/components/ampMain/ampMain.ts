import {Component} from 'angular2/core';
import {Queue} from '../queue/queue';
import {UrlInput} from '../urlInput/urlInput';

@Component({
  styles: [ require('./ampMain.scss') ],
  directives: [Queue, UrlInput],
  template: require('./ampMain.jade')
})
export class AmpMain {
  trackToAdd: Object;

  addToQueue($event: Object) {
    console.log(`received event: ${JSON.stringify($event)}`);
    this.trackToAdd = $event;
  }
}
