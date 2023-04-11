const env = {
  clientId: process.env["REACT_APP_SPOTIFY_CLIENT_ID"],
  clientSecret: process.env["REACT_APP_SPOTIFY_CLIENT_SECRET"],
  searchEndpoint: process.env["REACT_APP_SPOTIFY_SEARCH_ENDPOINT"],
  tokenEndpoint: process.env["REACT_APP_SPOTIFY_TOKEN_ENDPOINT"],
  userEndpoint: process.env["REACT_APP_AWS_USER_ENDPOINT"],
  playlistEndpoint: process.env["REACT_APP_AWS_PLAYLIST_ENDPOINT"],
};

export default env;
