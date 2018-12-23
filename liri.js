//import packages
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");

//global var
var textToLog = "";
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
        if (response.data.length === 0 || "errorMessage" in response.data) {
          textToLog = "There are no events with this artist";
          writeToFile("*** " + action + " " + value + "\n");
          writeToFile(textToLog + "\n");
          console.log(textToLog);
        } else {
          response.data.forEach(element => {
            textToLog += "Name of the venue: " + element.venue.name + "\n";
            textToLog +=
              "Venue location: " +
              element.venue.country +
              ", " +
              element.venue.city +
              "\n";
            textToLog +=
              "Date: " +
              moment(element.datetime).format("MMM Do YYYY") +
              "\n\n";
          });
          writeToFile("*** " + action + " " + value + "\n");
          writeToFile(textToLog);
          console.log(textToLog);
        }
      },
      function(error) {
        console.log(error.message);
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
          textToLog = "There is no movie with this title \n";
          writeToFile("*** " + action + " " + value + "\n");
          writeToFile(textToLog);
          console.log(textToLog);
        } else {
          textToLog += "Title of the movie: " + response.data.Title + "\n";
          textToLog += "Year the movie came out: " + response.data.Year + "\n";
          textToLog +=
            "IMDB Rating of the movie: " + response.data.imdbRating + "\n";
          if (response.data.Ratings[1] !== undefined) {
            textToLog +=
              "Rotten Tomatoes Rating of the movie: " +
              response.data.Ratings[1].Value +
              "\n";
          }
          textToLog +=
            "Country where the movie was produced: " +
            response.data.Country +
            "\n";
          textToLog +=
            "Language of the movie: " + response.data.Language + "\n";
          textToLog += "Plot of the movie: " + response.data.Plot + "\n";
          textToLog += "Actors in the movie: " + response.data.Actors + "\n\n";
          writeToFile("*** " + action + " " + value + "\n");
          writeToFile(textToLog);
          console.log(textToLog);
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
          textToLog += "Artist: " + e.name + "\n";
        });
        textToLog += "The song's name: " + data.name + "\n";
        textToLog +=
          "A preview link of the song from Spotify: " + data.preview_url + "\n";
        textToLog +=
          "The album that the song is from: " + data.album.name + "\n\n";
        writeToFile("*** " + action + " " + value + "\n");
        writeToFile(textToLog);
        console.log(textToLog);
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
          textToLog += "Artist: " + filtered.join(", ") + "\n";
          textToLog += "The song's name: " + element.name + "\n";
          textToLog +=
            "A preview link of the song from Spotify: " +
            element.preview_url +
            "\n";
          textToLog +=
            "The album that the song is from: " + element.album.name + "\n\n";
        });
        writeToFile("*** " + action + " " + value + "\n");
        writeToFile(textToLog);
        console.log(textToLog);
      })
      .catch(function(err) {
        console.error("Error occurred: " + err);
      });
  }
}

//do what it says
function read() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    var output = data.split(",");
    value = output[1];
    commands(output[0], value);
  });
}

//write to file
function writeToFile(textToLog) {
  fs.appendFile("log.txt", textToLog, function(err) {
    if (err) {
      console.log(err);
    }
  });
}

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
      read();
      break;
  }
}
commands(action, value);
