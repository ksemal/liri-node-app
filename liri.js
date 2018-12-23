//import packages
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");

//global var
var action = process.argv[2];
var value = "";
for (var i = 3; i < process.argv.length; i++) {
  value = value + process.argv[i] + " ";
}
value = value.trim();

//bands
function bands() {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        value +
        "/events?app_id=codingbootcamp"
    )
    .then(
      function(response) {
        if (response.data.length === 0) {
          console.log("There are no events with this artist");
        }
        response.data.forEach(element => {
          console.log("Name of the venue: " + element.venue.name);
          console.log(
            "Venue location: " +
              element.venue.country +
              ", " +
              element.venue.city
          );
          console.log(
            "Date: " + moment(element.datetime).format("MMM Do YYYY")
          );
          console.log("\n");
        });
      },
      function(error) {
        console.log(error);
      }
    );
}

// movie
function movie() {
  if (value === "") {
    value = "Mr. Nobody";
  }
  axios
    .get("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
    .then(
      function(response) {
        if (response.data.Response === "False") {
          console.log("There is no movie with this title");
        } else {
          console.log("Title of the movie: " + response.data.Title);
          console.log("Year the movie came out: " + response.data.Year);
          console.log("IMDB Rating of the movie: " + response.data.imdbRating);
          if (response.data.Ratings[1] !== undefined) {
            console.log(
              "Rotten Tomatoes Rating of the movie: " +
                response.data.Ratings[1].Value
            );
          }
          console.log(
            "Country where the movie was produced: " + response.data.Country
          );
          console.log("Language of the movie: " + response.data.Language);
          console.log("Plot of the movie: " + response.data.Plot);
          console.log("Actors in the movie: " + response.data.Actors);
        }
      },
      function(error) {
        console.log(error);
      }
    );
}

//spotify
function songs() {
  var spotify = new Spotify(keys.spotify);
  if (value === "") {
    spotify
      .request("https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE")
      .then(function(data) {
        var artistList = data.artists;
        artistList.forEach(function(e) {
          console.log("Artist: " + e.name);
        });
        console.log("The song's name: " + data.name);
        console.log(
          "A preview link of the song from Spotify: " + data.preview_url
        );
        console.log("The album that the song is from: " + data.album.name);
      })
      .catch(function(err) {
        console.error("Error occurred: " + err);
      });
  } else {
    spotify
      .request(
        "https://api.spotify.com/v1/search?q=" + value + "&type=track&limit=10"
      )
      .then(function(data) {
        var arr = data.tracks.items;
        arr.forEach(function(element) {
          var filtered = element.artists.map(e => e.name);
          console.log("Artist: " + filtered.join(", "));
          console.log("The song's name: " + element.name);
          console.log(
            "A preview link of the song from Spotify: " + element.preview_url
          );
          console.log("The album that the song is from: " + element.album.name);
          console.log("\n");
        });
      })
      .catch(function(err) {
        console.error("Error occurred: " + err);
      });
  }
}

//do what it says

//run commands
function commands(action, value) {
  switch (action) {
    case "concert-this":
      bands();
      break;
    case "spotify-this-song":
      songs();
      break;
    case "movie-this":
      movie();
      break;
    case "do-what-it-says":
      break;
  }
}
commands(action, value);
