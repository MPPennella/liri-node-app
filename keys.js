console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.omdb = {
  apiKey: process.env.OMDB_KEY
}

exports.bandsInTown = {
  appID: process.env.BIT_APP_ID
}