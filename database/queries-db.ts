import AccessToken from '../models/access_token';
import Requests from '../models/requests';

//Obtengo Token
async function getDbToken() {
    try {
        const dbtoken = await AccessToken.findAll();
        //console.log(dbtoken);
        if (Object.entries(dbtoken).length === 0) {
            return null;
        } else {
            return dbtoken[0]['dataValues'];
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

//Guardo Token
async function setDbToken(name: string = "", accessToken: string = "", recordedDate: string = "", expirationTime: number = 0, limitTime: number = 0.0) {
    try {
        await AccessToken.create({ 
            name, token: accessToken, 
            recorded_date: recordedDate, 
            expiration_time: expirationTime, 
            limit_time: limitTime 
        });
        return true;
    } catch (error) {
        throw error;
    }
}

//Actualizo Token
async function updateDbToken(accessToken: string = "", recordedDate: string = "", limitTime: number = 0.0) {
    try {
        await AccessToken.update({
            token: accessToken,
            recorded_date: recordedDate,
            limit_time: limitTime
        }, {
            where: { name: "token_spotify" }
        });
        return true;
    } catch (error) {
        throw error;
    }
}

async function saveRequestData(ip: string = "", date: string = "", artistName: string = "") {
    try {
        const requestSave = Requests.build({
        ip: ip,
        date: date,
        artist_name: artistName
        });

        await requestSave.save();
        return true;
    } catch (error) {
        throw error;
    }
}

export {
getDbToken,
setDbToken,
updateDbToken,
saveRequestData
}