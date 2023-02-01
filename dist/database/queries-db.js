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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveRequestData = exports.updateDbToken = exports.setDbToken = exports.getDbToken = void 0;
const access_token_1 = __importDefault(require("../models/access_token"));
const requests_1 = __importDefault(require("../models/requests"));
//Obtengo Token
function getDbToken() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dbtoken = yield access_token_1.default.findAll();
            //console.log(dbtoken);
            if (Object.entries(dbtoken).length === 0) {
                return null;
            }
            else {
                return dbtoken[0]['dataValues'];
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    });
}
exports.getDbToken = getDbToken;
//Guardo Token
function setDbToken(name = "", accessToken = "", recordedDate = "", expirationTime = 0, limitTime = 0.0) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield access_token_1.default.create({
                name, token: accessToken,
                recorded_date: recordedDate,
                expiration_time: expirationTime,
                limit_time: limitTime
            });
            return true;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.setDbToken = setDbToken;
//Actualizo Token
function updateDbToken(accessToken = "", recordedDate = "", limitTime = 0.0) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield access_token_1.default.update({
                token: accessToken,
                recorded_date: recordedDate,
                limit_time: limitTime
            }, {
                where: { name: "token_spotify" }
            });
            return true;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.updateDbToken = updateDbToken;
function saveRequestData(ip = "", date = "", artistName = "") {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const requestSave = requests_1.default.build({
                ip: ip,
                date: date,
                artist_name: artistName
            });
            yield requestSave.save();
            return true;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.saveRequestData = saveRequestData;
//# sourceMappingURL=queries-db.js.map