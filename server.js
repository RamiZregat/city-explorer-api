"use strict";

require("dotenv").config();
const express = require("express");
const server = express();
const PORT = process.env.PORT;
const weatherdata = require("./Data/weather.json");
const cors = require("cors");
const { default: axios } = require("axios");
server.use(cors());

server.listen(PORT, () => {
  console.log(`Hello this is PORT ${PORT}`);
});

// http://localhost:3010/weather?lat=lat&lon=lon
server.get("/weather",async (req, res) => {
  const lon = req.query.lon;
  const lat = req.query.lat;
  const Key = process.env.WEATHER_API_KEY;
  const URL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${Key}&lat=${lat}&lon=${lon}`;
  let urlData = await axios.get(URL)
  let weatherArray=[];
    // const result = weatherdata.find(item =>{
    //     if(item.lat === lat && item.lon === lon)
    //     {
        
         weatherArray=urlData.data.data.map(day => {
                return new Forcast(day)
            })
    //     }       
    // })
            // console.log(weatherArray);
    res.send(weatherArray);
});


function Forcast(day){
    this.date=day.valid_date
    this.description=`Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`
}

// http://localhost:3010/movies?moviename=q
server.get("/movies", async(req,res)=>{
    const movieName = req.query.moviename;
    const Key = process.env.MOVIE_API_KEY;
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${Key}&query=${movieName}`
    let moviesData= await axios.get(URL)
    let moviesArray=[];
    moviesArray=moviesData.data.results.map(item=>{
        return new MoviesCreator(item)
    })
    res.send(moviesArray);

})

function MoviesCreator(movie){
    this.title = movie.title
    this.overview = movie.overview
    this.average_votes = movie.vote_average
    this.total_votes = movie.vote_count
    this.image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    this.popularity = movie.popularity
    this.released_on = movie.release_date
}