import {Component, Input, HostBinding, SimpleChange, NgZone} from 'angular2/core';
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

  private zone: NgZone;

  private isPlaying: boolean;
  private isPaused: boolean;
  private isDownloading: boolean;

  private currentPitch: number;

  private context: any;
  private source: any;
  private ImageAnalyzer: any;

  private trackArr: Array<any>;

  constructor(zone: NgZone) {
    this.zone = zone;
    this.context = new AudioContext();

    this.backgroundColor = 'white';
    this.primaryColor = 'black';
    this.secondaryColor = 'black';
    this.detailColor = 'black';

    this.isPlaying = false;
    this.isPaused = false;
    this.isDownloading = false;

    this.trackArr = [];
  }

  ngOnChanges(changes: TrackChange) {
    let trackAdded = changes.toPlayer && changes.toPlayer.currentValue;
    if (trackAdded) {
      // need to keep (downloaded) tracks in an array in order to keep track of paused/play state
      // for each source.

      // if there is no single trackObj in trackArr for which
      // its title is the same as the current track in the player
      if (!this.trackArr.reduce(
        function(acc, track) {
          return acc || (track.title && (track.title === trackAdded.title));
        }, false)
      ) {
        this.isDownloading = true;
        let trackObj: any = {};
        let request = new XMLHttpRequest();
        request.open('GET', trackAdded.url, true);
        request.responseType = 'arraybuffer';
        request.onload = () => {
          trackObj.title = trackAdded.title;
          trackObj.data = request.response;
          this.trackArr.push(trackObj);
          this.isDownloading = false;
        };
      request.send();
      }

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

    let correctTrackObj;
    this.trackArr.forEach((trackObj) => {
      if (trackObj.title === this.toPlayer.title) {
        correctTrackObj = trackObj;
      }
    });
    this.source = this.context.createBufferSource();
    this.context.decodeAudioData(correctTrackObj.data, (decodedBuffer) => {
      this.source.buffer = decodedBuffer;
    });
    this.source.connect(this.context.destination);
    if (this.currentPitch) this.source.playbackRate.value = this.currentPitch;
    this.source.onended = () => {
      this.zone.run(() => {
        this.stop();
      });
    };
    this.source.start(0);
  }

  private stop(): void {
    if (this.source) this.source.stop();
    this.isPaused = false;
    this.isPlaying = false;
  }

  private pause(): void {
    this.context.suspend();
    this.isPlaying = false;
    this.isPaused = true;
  }

  private pitchChange(value): void {
    this.source.playbackRate.value = value;
    this.currentPitch = value;
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
    public genre: string,
    public title: string
  ) {}
}

interface TrackChange extends SimpleChange {
  toPlayer: SimpleChange;
}
