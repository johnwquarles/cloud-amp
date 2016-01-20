import {Component, EventEmitter} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http} from 'angular2/http';

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

  constructor(http: Http) {
    this.CLIENT_ID = '02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea';
    this.get_track_id_url = 'http://api.soundcloud.com/resolve.json?url=';
    this.get_track_from_id_url = 'http://api.soundcloud.com/i1/tracks/';
    this.addNewTrack = new EventEmitter();
    this.http = http;
  }

  enterUrl(url) {
    this.get_track_id_obj(url);
  }

  get_track_id_obj(url) {
    this.http.get(`${this.get_track_id_url}${url}&client_id=${this.CLIENT_ID}`)
             .map(res => {
               return this.prune_id_response(res.json());
             })
             .subscribe(
               data => this.get_track_url(data),
               err => this.logError(err),
               () => { console.log('get_track_id succeeded'); }
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
               data => { this.addNewTrack.emit(data); },
               err => this.logError(err),
               () => { console.log('resolved track url succesfully'); }
             );
  }

  logError(err) {
    console.log(`error: ${err}`);
  }

  prune_id_response(res) {
    return {
      title: res.title,
      artwork_url: res.artwork_url,
      description: res.description,
      id: res.id,
      genre: res.genre,
      duration: res.duration,
      artist: res.user.username
    };
  }
}
