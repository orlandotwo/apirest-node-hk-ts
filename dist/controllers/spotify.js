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
exports.getAlbums = void 0;
const management_jwt_1 = require("../helpers/management-jwt");
const queries_db_1 = require("../database/queries-db");
const tools_1 = require("../helpers/tools");
const spotify_api_queries_1 = require("../helpers/spotify-api-queries");
const getAlbums = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { artistName = '' } = req.query;
    //console.log('Artist Name: ',artistName);
    let access_token = '';
    let respGetCurrentDate = (0, tools_1.getCurrentDate)();
    try {
        const dbToken = yield (0, queries_db_1.getDbToken)();
        //console.log('Token: ', dbToken['token']);
        if (dbToken !== null) {
            access_token = dbToken['token'];
            //const respGetCurrentDate  = getCurrentDate();
            if (respGetCurrentDate['currentNumberDate'] > dbToken['limit_time']) {
                const resp = yield (0, management_jwt_1.generateToken)();
                if (resp.status === 200) {
                    //const { date, currentNumberDate } = getCurrentDate();
                    access_token = resp.data.access_token;
                    const limit_time = respGetCurrentDate['currentNumberDate'] + resp.data.expires_in;
                    const date = respGetCurrentDate['date'].toString();
                    yield (0, queries_db_1.updateDbToken)(access_token, date, limit_time);
                }
            }
        }
        else {
            const resp = yield (0, management_jwt_1.generateToken)();
            if (resp.status === 200) {
                //const { date, currentNumberDate } = getCurrentDate();
                access_token = resp.data.access_token;
                const recorded_date = respGetCurrentDate['date'].toString();
                const expiration_time = resp.data.expires_in;
                const limit_time = respGetCurrentDate['currentNumberDate'] + resp.data.expires_in;
                yield (0, queries_db_1.setDbToken)('token_spotify', access_token, recorded_date, expiration_time, limit_time);
            }
        }
        const queryArtist = yield (0, spotify_api_queries_1.artist)(access_token, artistName.toString());
        const queryArtistAlbums = yield (0, spotify_api_queries_1.artistAlbums)(access_token, queryArtist.id);
        const userIp = req.connection.remoteAddress;
        //const { date } = getCurrentDate();
        const auxArtistName = queryArtist.name;
        yield (0, queries_db_1.saveRequestData)(userIp, respGetCurrentDate['date'].toString(), auxArtistName);
        const respAddPopularityInListAlbum = yield (0, tools_1.addPopularityInListAlbum)(access_token, queryArtistAlbums.data.items);
        const auxQAA = yield respAddPopularityInListAlbum.sort((a, b) => b.popularity - a.popularity);
        res.json({
            artist: queryArtist,
            albums: auxQAA,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'No se encontro Artista',
        });
    }
});
exports.getAlbums = getAlbums;
//# sourceMappingURL=spotify.js.map