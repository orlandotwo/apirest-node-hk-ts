"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlbum = exports.artistAlbums = exports.artist = void 0;
const axios = require('axios');
const artist = (access_token = '', artist = '') => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authOptions = {
            url: 'https://api.spotify.com/v1/search',
            data: undefined,
            method: 'GET',
            headers: {
                'Content-Type': 'Content-Type: application/json',
                'Authorization': 'Bearer ' + access_token
            },
            params: {
                type: 'artist',
                q: artist
            },
            json: true
        };
        let resp = yield axios(authOptions);
        return resp.data.artists.items[0];
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.artist = artist;
const artistAlbums = (access_token = '', idArtist = '') => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authOptions = {
            url: 'https://api.spotify.com/v1/artists/' + idArtist + '/albums',
            data: undefined,
            method: 'GET',
            headers: {
                'Content-Type': 'Content-Type: application/json',
                'Authorization': 'Bearer ' + access_token
            }
        };
        let resp = yield axios(authOptions);
        return resp;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.artistAlbums = artistAlbums;
const getAlbum = (access_token = '', idAlbum = '') => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authOptions = {
            url: 'https://api.spotify.com/v1/albums/' + idAlbum,
            data: undefined,
            method: 'GET',
            headers: {
                'Content-Type': 'Content-Type: application/json',
                'Authorization': 'Bearer ' + access_token
            },
            params: {
                type: "album"
            }
        };
        let resp = yield axios(authOptions);
        return resp;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.getAlbum = getAlbum;
//# sourceMappingURL=spotify-api-queries.js.map