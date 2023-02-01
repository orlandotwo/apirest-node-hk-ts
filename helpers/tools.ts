import { getAlbum } from "./spotify-api-queries";

const getCurrentDate = (): { date: Date, currentDate: string, currentTime: string, currentNumberDate: number } => {
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
}

const addPopularityInListAlbum = async (access_token: string, listAlbum: { id: any; popularity: any; }[]): Promise<{ id: any; popularity: any; }[]> => {
    for (let i = 0; i < listAlbum.length; i++) {
      try {
        const respGetAlbum = await getAlbum(access_token, listAlbum[i].id);
        listAlbum[i].popularity = respGetAlbum.data.popularity;
      } catch (error) {
        listAlbum[i].popularity = 0;
      }
    }
    return listAlbum;
};
export { getCurrentDate, addPopularityInListAlbum };