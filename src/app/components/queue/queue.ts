import {Component} from 'angular2/core';
import {SimpleChange} from 'angular2/core';

@Component({
  selector: 'queue',
  inputs: ['inputTrack'],
  styles: [ require('./queue.scss') ],
  template: require('./queue.jade')
})
export class Queue {
  inputTrack: {};

  ngOnChanges(changes: SimpleChange) {
    let trackAdded = changes['inputTrack'] && changes['inputTrack']['currentValue'];
    if (trackAdded) {
      console.log(trackAdded);
    }
  }
}
