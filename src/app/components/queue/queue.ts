import {Component, EventEmitter, SimpleChange} from 'angular2/core';
import {TrackInQueue} from '../trackInQueue/trackInQueue';
let _ = require('lodash');

@Component({
  selector: 'queue',
  inputs: ['inputTrack'],
  outputs: ['emitClickedTrack'],
  directives: [TrackInQueue],
  styles: [ require('./queue.scss') ],
  template: require('./queue.jade')
})
export class Queue {
  inputTrack: {};
  trackList: any;
  emitClickedTrack: EventEmitter<Object>;

  constructor() {
    this.trackList = [];
    this.emitClickedTrack = new EventEmitter();
  }

  receiveTrackObj($event) {
    this.emitClickedTrack.emit($event);
  }

  ngOnChanges(changes: TrackChange) {
    let trackAdded = changes.inputTrack && changes.inputTrack.currentValue;
    if (trackAdded) {
      // ensure that track is unique to the queue.
      // can't just do deep equality because the urls come back slightly different each time.
      if (!this.trackList.reduce( (acc, track) => {
        return acc || Object.keys(track).reduce( (acc, prop) => {
          if (prop === 'url') return acc && true;
          console.log(prop, track[prop], trackAdded[prop]);
          return acc && (track[prop] === trackAdded[prop]);
        }, true);
      }, false)) {
        this.trackList.push(trackAdded);
      } else { console.log('track was not unique to the queue'); }
    }
  }
}

interface TrackChange extends SimpleChange {
  inputTrack: SimpleChange;
}
