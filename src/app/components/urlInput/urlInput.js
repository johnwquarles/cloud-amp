"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var UrlInput = (function () {
    function UrlInput(http) {
        this.CLIENT_ID = '02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea';
        this.get_track_id_url = 'http://api.soundcloud.com/resolve.json?url=';
        this.get_track_from_id_url = 'http://api.soundcloud.com/i1/tracks/';
        this.addNewTrack = new core_1.EventEmitter();
        this.http = http;
    }
    UrlInput.prototype.enterUrl = function (url) {
        this.get_track_id_obj(url);
    };
    UrlInput.prototype.get_track_id_obj = function (url) {
        var _this = this;
        this.http.get("" + this.get_track_id_url + url + "&client_id=" + this.CLIENT_ID)
            .map(function (res) {
            return _this.prune_id_response(res.json());
        })
            .subscribe(function (data) { return _this.get_track_url(data); }, function (err) { return _this.logError(err); });
    };
    UrlInput.prototype.get_track_url = function (obj) {
        var _this = this;
        this.http.get("" + this.get_track_from_id_url + obj.id + "/streams?client_id=" + this.CLIENT_ID)
            .map(function (res) {
            obj.url = res.json().http_mp3_128_url;
            delete obj.id;
            return obj;
        })
            .subscribe(function (data) { _this.addNewTrack.emit(data); }, function (err) { return _this.logError(err); });
    };
    UrlInput.prototype.logError = function (err) {
        console.warn("error: " + err);
    };
    UrlInput.prototype.prune_id_response = function (res) {
        return {
            title: res.title,
            artwork_url: res.artwork_url,
            description: res.description,
            id: res.id,
            genre: res.genre
        };
    };
    UrlInput = __decorate([
        core_1.Component({
            outputs: ['addNewTrack'],
            selector: 'url-input',
            styles: [require('./urlInput.scss')],
            template: require('./urlInput.jade')
        }),
        __metadata('design:paramtypes', [http_1.Http])
    ], UrlInput);
    return UrlInput;
})();
exports.UrlInput = UrlInput;
//# sourceMappingURL=urlInput.js.map
