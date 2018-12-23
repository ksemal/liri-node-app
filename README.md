# liri-node-app

## Overview

LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data about movies, songs and events.

## Description

- LIRI searches Spotify for songs, Bands in Town for concerts, and OMDB for movies.

- In this app I used the followings node packages and API:
  - [OMDB API](http://www.omdbapi.com)
  - [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
  - [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
  - [Axios](https://www.npmjs.com/package/axios)
  - [Moment](https://www.npmjs.com/package/moment)
  - [DotEnv](https://www.npmjs.com/package/dotenv)

## How to use app

### In terminal/bash liri-node-app can take in one of the following commands(`<your search>` is optional):

1.  `concert-this <artist/band name here>` This will search for an artist and render the following information about each event to the terminal:

    - Name of the venue

    - Venue location

    - Date of the Event

2.  `spotify-this-song <song name here>` This will show the following information about the song in your terminal/bash window:

    - Artist(s)

    - The song's name

    - A preview link of the song from Spotify

    - The album that the song is from

    If no song is provided then your program will default to "The Sign" by Ace of Base

3.  `movie-this` This will output the following information to your terminal/bash window:

    - Title of the movie.

    - Year the movie came out.

    - IMDB Rating of the movie.

    - Rotten Tomatoes Rating of the movie.

    - Country where the movie was produced.

    - Language of the movie.

    - Plot of the movie.

    - Actors in the movie.

    If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.

4.  `do-what-it-says` LIRI takes the text inside of random.txt and then use it to call one of LIRI's commands

### Additional

In addition to logging the data to your terminal/bash window, the data is written to a .txt file called `log.txt`.
