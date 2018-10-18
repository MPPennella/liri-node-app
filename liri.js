require("dotenv").config()
let keys = require("./keys")

let Spotify = require("node-spotify-api")
let spotify = new Spotify(keys.spotify)

let request = require("request")
let moment = require("moment")

let fs = require("fs")

let cmd = process.argv[2]
main(cmd)

// Main controller for executing different commands
function main(cmd) {
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
}

/*
 * Handler for Bands In Town API command - 
 */
function bandsInTownCommand() {
    let artist = "REO Speedwagon"
    if (process.argv[3]) artist = process.argv[3]
    
    let bitURL = `http://rest.bandsintown.com/artists/${artist}/events?app_id=${keys.bandsInTown.appID}&date=upcoming`

    request(bitURL, (error, response,body) => {
        if (error) {
            return console.log(error)
        }

        let events = JSON.parse(body)

        if (events.length>0) {
            console.log(`UPCOMING EVENTS FOR ${artist}:`)
            events.map(logEvent)
        } else {
            console.log(`No events found for artist "${artist}"`)
        }
    })

}

// Helper function for logging Bands in Town event info
function logEvent(event)  {
    console.log()
    console.log(event.venue.name)
    console.log(`${event.venue.city}, ${event.venue.region}, ${event.venue.country}`)
    console.log( moment(event.datetime).format("MM/DD/YYYY") )
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
            
            let preview
            if (track.preview_url) preview = track.preview_url
            else preview = "unavailable"
            console.log("PREVIEW: "+preview)

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
        if (error) {
            return console.log(error)
        }

        let movie = JSON.parse(body)

        console.log("TITLE: "+movie.Title)
        console.log("YEAR: "+movie.Year)
        console.log("IMDB Rating: "+movie.imdbRating)
        if (movie.Ratings.length>=2) {
            console.log("Rotten Tomatoes Rating: "+movie.Ratings[1].Value)
        } else {
            console.log("Rotten Tomatoes Rating: Not available")
        }
        console.log("COUNTRY: "+movie.Country)
        console.log("LANGUAGE: "+movie.Language)
        console.log("PLOT: "+movie.Plot)
        console.log("ACTORS: "+movie.Actors)
        
    })
}

/*
 * Handler for do-what-it-says command - 
 */
function doItCommand() {
    fs.readFile("./random.txt", "utf8", (error, file) => {
        if (error) {
            return console.log(error)
        }

        let i = file.indexOf(",")
        let command = file.slice(0,i)
        let argument = file.slice(i+1)
        
        main(command)
    })
}