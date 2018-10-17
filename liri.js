
require("node-spotify-api")
require("request")
require("moment")
require("dotenv").config()
let keys = require("./keys")

let cmd = process.argv[2]

switch (cmd) {
    case "concert-this":
        ;
        break;
    case "spotify-this-song":
        ;
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