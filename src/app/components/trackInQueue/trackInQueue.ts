import {Component, EventEmitter, Input} from 'angular2/core';
let ImageAnalyzer = require('../../services/AverageColor.ts');

@Component({
  outputs: ['emitTrackObj'],
  selector: 'individual-track',
  styles: [ require('./trackInQueue.scss') ],
  template: require('./trackInQueue.jade')
})
export class TrackInQueue {
  @Input() trackObj: any;
  emitTrackObj: EventEmitter<Object>;
  public backgroundColor: string;
  public primaryColor: string;
  public secondaryColor: string;
  public detailColor: string;

  constructor() {
    this.emitTrackObj = new EventEmitter();
    this.backgroundColor = 'white';
    this.primaryColor = 'black';
    this.secondaryColor = 'black';
    this.detailColor = 'black';
  };

  sendTrackObj() {
    this.emitTrackObj.emit(this.trackObj);
  }

  ngOnInit() {
    ImageAnalyzer(this.trackObj.artwork_url, (bgColor, primaryColor, secondaryColor, detailColor) => {
      this.backgroundColor = `rgb(${bgColor})`;
      this.primaryColor = `rgb(${primaryColor})`;
      this.secondaryColor = `rgb(${secondaryColor})`;
      this.detailColor = `rgb(${detailColor})`;
    });
  }
}
