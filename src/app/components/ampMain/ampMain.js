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
var queue_1 = require('../queue/queue');
var urlInput_1 = require('../urlInput/urlInput');
var player_1 = require('../player/player');
var AmpMain = (function () {
    function AmpMain() {
        this.sendToPlayer = {
            artwork_url: '',
            url: '',
            title: ''
        };
    }
    AmpMain.prototype.addToQueue = function ($event) {
        this.trackToAdd = $event;
    };
    AmpMain.prototype.sendTrackToPlayer = function ($event) {
        this.sendToPlayer = $event;
    };
    AmpMain = __decorate([
        core_1.Component({
            styles: [require('./ampMain.scss')],
            directives: [queue_1.Queue, urlInput_1.UrlInput, player_1.Player],
            template: require('./ampMain.jade')
        }),
        __metadata('design:paramtypes', [])
    ], AmpMain);
    return AmpMain;
})();
exports.AmpMain = AmpMain;
//# sourceMappingURL=ampMain.js.map
