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
exports.addPopularityInListAlbum = exports.getCurrentDate = void 0;
const spotify_api_queries_1 = require("./spotify-api-queries");
const getCurrentDate = () => {
    const date = new Date();
    const currentDate = date.toLocaleDateString();
    const currentTime = date.toTimeString();
    const currentNumberDate = Date.now() / 1000;
    const resp = {
        date,
        currentDate,
        currentTime,
        currentNumberDate
    };
    return resp;
};
exports.getCurrentDate = getCurrentDate;
const addPopularityInListAlbum = (access_token, listAlbum) => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < listAlbum.length; i++) {
        try {
            const respGetAlbum = yield (0, spotify_api_queries_1.getAlbum)(access_token, listAlbum[i].id);
            listAlbum[i].popularity = respGetAlbum.data.popularity;
        }
        catch (error) {
            listAlbum[i].popularity = 0;
        }
    }
    return listAlbum;
});
exports.addPopularityInListAlbum = addPopularityInListAlbum;
//# sourceMappingURL=tools.js.map