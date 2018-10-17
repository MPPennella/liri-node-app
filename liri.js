require("dotenv").config()
let keys = require("./keys")

let Spotify = require("node-spotify-api")
let spotify = new Spotify(keys.spotify)

let request = require("request")
require("moment")

let cmd = process.argv[2]

switch (cmd) {
    case "concert-this":
        bandsInTownCommand();
        break;
    case "spotify-this-song":
        spotifyCommand();
        break;
    case "movie-this":
        omdbCommand();
        break;
    case "do-what-it-says":
        doItCommand();
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
 * Handler for Bands In Town API command - 
 */
function bandsInTownCommand() {
    console.log("COMING SOON - BANDS IN TOWN")
}

/*
 * Handler for Spotify API command - takes a song name, searches Spotify API, and displays Artist name, Song name, preview link, Album name
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

/*
 * Handler for OMDB API command - 
 */
function omdbCommand() {
    let title = "Mr. Nobody";
    if (process.argv[3]) title = process.argv[3]

    let omdbURL = `https://www.omdbapi.com/?t=${title}&y=&plot=short&apikey=${keys.omdb.apiKey}`

    request(omdbURL, (error, response, body) => {
        console.log("BODY", JSON.parse(body))
    })
}

/*
 * Handler for do-what-it-says command - 
 */
function doItCommand() {
    console.log("COMING SOON - do-what-it-says")
}