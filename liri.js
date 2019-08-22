require('dotenv').config();
require("dotenv").config();
var fs =require("fs");
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var clientId = "5fe54e6d1fb64351a767cb5e618b872c";
var clientSecret = "05f6dfc977564b93830b379016a1f797";
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');


fs.readFile('random.txt',"utf8", function(err, data) {
    console.log(data)
    
  });







if (process.argv[2] === "movie-this") {

    var title = process.argv.slice(3).join(" ");
    
if(!process.argv[3]){
    var title ='Mr. Nobody'
}


    axios.get(`http://www.omdbapi.com/?apikey=ceedfc9b&t=${title}`).then(function (response) {
        console.log("Title: " + response.data.Title + "\nYear: " + response.data.Year + "\nRating: " + response.data.imdbRating + "\nRotten Tomato Rating: " + response.data.Ratings[1].Value + "\nCountry: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors)
    })

}

// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")


if (process.argv[2] === "concert-this") {
    var artist = process.argv.slice(3).join(" ");

    axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp&date=upcoming`).then(function (response) {
        console.log("Venue: " + response.data[0].venue.name + "\nLocation: " + response.data[0].venue.city + "\nDate: " + moment(response.data[0].datetime).format('MMMM Do YYYY, h:mm:ss a'))
    })

}




// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from

//If no song is provided then your program will default to "The Sign" by Ace of Base.

if (process.argv[2] === "spotify-this") {


    var song = process.argv.slice(3).join(" ");

    if(!process.argv[3]){
        var song="The Sign"
        
    }

    var spotify = new Spotify({
        id: clientId,
        secret: clientSecret
    });

    spotify.search({ type: 'track', query: `${song}` }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Song Name: "+data.tracks.items[0].name+"\nPreview: "+data.tracks.items[0].preview_url+"\nAlbum: "+data.tracks.items[0].album.name )

        //   console.log("Artist: "+data.tracks.items[0].artists+"Name: "+data.tracks.items[0].name); 
    });


}