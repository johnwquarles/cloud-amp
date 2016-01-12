import {Component, EventEmitter} from 'angular2/core';
import {Input} from 'angular2/core';

@Component({
  outputs: ['emitTrackObj'],
  selector: 'individual-track',
  styles: [ require('./trackInQueue.scss') ],
  template: require('./trackInQueue.jade')
})
export class TrackInQueue {
  @Input() trackObj: {};
  emitTrackObj: EventEmitter<Object>;

  constructor() {
    this.emitTrackObj = new EventEmitter();
  };

  sendTrackObj() {
    console.log('got click');
    this.emitTrackObj.emit(this.trackObj);
  }
}
