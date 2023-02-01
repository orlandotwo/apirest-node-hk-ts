import { Request, Response } from 'express';
import {generateToken}  from '../helpers/management-jwt';
import { getDbToken, setDbToken, updateDbToken, saveRequestData } from '../database/queries-db';
import {getCurrentDate}  from '../helpers/tools';
import { artist, artistAlbums } from '../helpers/spotify-api-queries';

const getAlbums = async( req: Request, res: Response) => {
    const { artistName = '' } = req.query;
    //console.log('Artist Name: ',artistName);
    let access_token = '';
    let respGetCurrentDate  = getCurrentDate();
  try {
    const dbToken = await getDbToken();
    //console.log('Token: ', dbToken['token']);
    if (dbToken !== null) {
      access_token = dbToken['token'];
       //const respGetCurrentDate  = getCurrentDate();

      if (respGetCurrentDate['currentNumberDate'] > dbToken['limit_time']) {
        const resp = await generateToken();
        if (resp.status === 200) {
          //const { date, currentNumberDate } = getCurrentDate();
          access_token = resp.data.access_token;
          const limit_time = respGetCurrentDate['currentNumberDate'] + resp.data.expires_in;
          const date = respGetCurrentDate['date'].toString();
          await updateDbToken(access_token, date, limit_time);
        }
      }
    } else {
      const resp = await generateToken();
      if (resp.status === 200) {
        //const { date, currentNumberDate } = getCurrentDate();
        access_token = resp.data.access_token;
        const recorded_date = respGetCurrentDate['date'].toString();
        const expiration_time = resp.data.expires_in;
        const limit_time = respGetCurrentDate['currentNumberDate'] + resp.data.expires_in;

        await setDbToken('token_spotify', access_token, recorded_date, expiration_time, limit_time);
      }
    }
    const queryArtist = await artist(access_token, artistName.toString());
    const queryArtistAlbums = await artistAlbums(access_token, queryArtist.id);

    const userIp = req.connection.remoteAddress;
    //const { date } = getCurrentDate();
    const auxArtistName = queryArtist.name;

    await saveRequestData(userIp, respGetCurrentDate['date'].toString(), auxArtistName);

    res.json({
      artist: queryArtist,
      albums: queryArtistAlbums.data.items,
    });
  } catch (error) {
    res.status(400).json({
      msg: 'No se encontro Artista',
    });
  }
};

export { getAlbums }