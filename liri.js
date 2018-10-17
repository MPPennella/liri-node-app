require("dotenv").config()
let keys = require("./keys")

let Spotify = require("node-spotify-api")
let spotify = new Spotify(keys.spotify)

require("request")
require("moment")

let cmd = process.argv[2]

switch (cmd) {
    case "concert-this":
        ;
        break;
    case "spotify-this-song":
        spotifyCommand();
        break;
    case "movie-this":
        ;
        break;
    case "do-what-it-says":
        ;
        break;
    default:
        console.log(`Invalid command '${cmd}', valid commands are as follows:`);
        console.log("* concert-this [artist name]");
        console.log("* spotify-this-song [song name]");
        console.log("* movie-this [movie name]");
        console.log("* do-what-it-says");
        break;
}

/*
 * Handler for Spotify command - takes a song name, searches Spotify API, and displays Artist name, Song name, preview link, Album name
 */
function spotifyCommand() {
    let song = "The Sign Ace of Base";
    if (process.argv[3]) song = process.argv[3]

    spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        let trackList = data.tracks.items
        for (let i=0; i<trackList.length; i++){
            let track = trackList[i]
            console.log("ARTIST: "+track.artists[0].name)
            console.log("SONG TITLE: "+track.name)
            console.log("PREVIEW: "+track.preview_url)
            console.log("ALBUM NAME: "+track.album.name)
            console.log()
        }
    });


}