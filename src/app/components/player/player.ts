import {Component, Input, HostBinding, SimpleChange} from 'angular2/core';
let ImageAnalyzer = require('../../services/AverageColor.ts');
let artworkPicker = require('../../services/selectArt.ts');

@Component({
  selector: 'player',
  inputs: ['toPlayer'],
  styles: [ require('./player.scss') ],
  template: require('./player.jade')
})
export class Player {
  public toPlayer: ToPlayer;

  public backgroundColor: string;
  public primaryColor: string;
  public secondaryColor: string;
  public detailColor: string;
  public overlayColor: string;
  public overlayGradient: string;

  private isPlaying: boolean;
  private isPaused: boolean;

  private coors_proxy: string;
  private context: any;
  private source: any;
  private ImageAnalyzer: any;

  constructor() {
    this.coors_proxy = 'https://crossorigin.me/';
    this.context = new AudioContext();

    this.backgroundColor = 'white';
    this.primaryColor = 'black';
    this.secondaryColor = 'black';
    this.detailColor = 'black';

    this.isPlaying = false;
    this.isPaused = false;
  }

  ngOnChanges(changes: TrackChange) {
    let trackAdded = changes.toPlayer && changes.toPlayer.currentValue;
    if (trackAdded) {
      // need to keep (downloaded) tracks in an array in order to keep track of paused/play state
      // for each source.
      ImageAnalyzer(trackAdded.artwork_url, (bgColor, primaryColor, secondaryColor, detailColor) => {
        this.backgroundColor = `rgb(${bgColor})`;
        this.primaryColor = `rgb(${primaryColor})`;
        this.secondaryColor = `rgb(${secondaryColor})`;
        this.detailColor = `rgb(${detailColor})`;
        this.overlayGradient = `linear-gradient(rgba(${bgColor},0.8) 0, rgba(${bgColor},0.8) 100%)`;
      });
    }
  }

  private play(): void {
    if (this.isPaused) {
      this.context.resume();
      this.isPlaying = true;
      this.isPaused = false;
      return;
    }

    if (this.isPlaying) this.stop();

    this.isPlaying = true;
    let request = new XMLHttpRequest();
    request.open('GET', this.coors_proxy + this.toPlayer.url, true);
    request.responseType = 'arraybuffer';
    request.onload = () => {
      this.context.decodeAudioData(request.response, (decodedBuffer) => {
        this.source = this.context.createBufferSource();
        this.source.buffer = decodedBuffer;
        this.source.connect(this.context.destination);
        // want to access #slider here (from the markup). How?
        this.source.start(0);
      });
    };
    request.send();
  }

  private stop(): void {
    this.source && this.source.stop();
    this.isPaused = false;
    this.isPlaying = false;
  }

  private pause(): void {
    this.context.suspend();
    this.isPlaying = false;
    this.isPaused = true;
  }
};

// private isPlaying(): boolean {
//   return this.source && this.source.playbackState === this.source.PLAYING_STATE;
// }

class ToPlayer {
  constructor(
    public url: string,
    public artwork_url: string,
    public description: string,
    public duration: string,
    public artist: string,
    public genre: string
  ) {}
}

interface TrackChange extends SimpleChange {
  toPlayer: SimpleChange;
}
