import axios from "axios";

export const searchArtistService = (artistName) => {
  return axios.get(`https://rest.bandsintown.com/artists/${artistName}`, {
    params: { app_id: "abc" },
  });
};

export const searchEventsService = (artistName) => {
  return axios.get(
    `https://rest.bandsintown.com/artists/${artistName}/events`,
    {
      params: { app_id: "abc" },
    }
  );
};
