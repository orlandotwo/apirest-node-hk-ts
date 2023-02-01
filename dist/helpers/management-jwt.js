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
exports.generateToken = void 0;
const axios_1 = __importDefault(require("axios"));
const generateToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const clientId = process.env.CLIENTID;
    const clientSecret = process.env.CLIENTSECRET;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        data: undefined,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64'))
        },
        params: {
            grant_type: 'client_credentials'
        },
        json: true
    };
    try {
        const resp = yield (0, axios_1.default)(authOptions);
        //console.log(resp);
        return resp;
    }
    catch (error) {
        throw error;
    }
});
exports.generateToken = generateToken;
//# sourceMappingURL=management-jwt.js.map