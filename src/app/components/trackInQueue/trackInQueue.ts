import {Component, EventEmitter, Input} from 'angular2/core';

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
    this.emitTrackObj.emit(this.trackObj);
  }
}
