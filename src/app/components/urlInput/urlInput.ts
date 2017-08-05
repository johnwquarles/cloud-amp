import {Component, EventEmitter} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http} from 'angular2/http';
let artworkPicker = require('../../services/selectArt.ts');

@Component({
  outputs: ['addNewTrack'],
  selector: 'url-input',
  styles: [ require('./urlInput.scss') ],
  template: require('./urlInput.jade')
})
export class UrlInput {
  http: Http;
  CLIENT_ID: string;
  get_track_id_url: string;
  get_track_from_id_url: string;
  addNewTrack: EventEmitter<Object>;
  small_artwork_setting: string;
  artwork_setting: string;

  constructor(http: Http) {
    this.CLIENT_ID = 'JlZIsxg2hY5WnBgtn3jfS0UYCl0K8DOg';
    this.get_track_id_url = 'http://api.soundcloud.com/resolve.json?url=';
    this.get_track_from_id_url = 'http://api.soundcloud.com/i1/tracks/';
    this.addNewTrack = new EventEmitter();
    this.http = http;
    this.small_artwork_setting = 't67x67';
    this.artwork_setting = 't300x300';
  }

  enterUrl(url) {
    this.get_track_id_obj(url);
  }

  get_track_id_obj(url) {
    this.http.get(`${this.get_track_id_url}${url}&client_id=${this.CLIENT_ID}`)
             .map(res => {
               console.log(res);
               return this.prune_id_response(res.json());
             })
             .subscribe(
               data => this.get_track_url(data),
               err => this.logError(err),
               () => console.log('get_track_id succeeded')
             );
  }

  get_track_url(obj) {
    this.http.get(`${this.get_track_from_id_url}${obj.id}/streams?client_id=${this.CLIENT_ID}`)
             .map (res => {
               obj.url = res.json().http_mp3_128_url;
               delete obj.id;
               return obj;
             })
             .subscribe(
               // event is emitted here!
               data => this.addNewTrack.emit(data),
               err => this.logError(err),
               () => console.log('resolved track url succesfully')
             );
  }

  logError(err) {
    console.log(`error: ${err}`);
  }

  prune_id_response(res) {
    return {
      title: res.title,
      artwork_url_small: artworkPicker(res.artwork_url, this.small_artwork_setting),
      artwork_url: artworkPicker(res.artwork_url, this.artwork_setting),
      description: res.description,
      id: res.id,
      genre: res.genre,
      duration: res.duration,
      artist: res.user.username
    };
  }
}
