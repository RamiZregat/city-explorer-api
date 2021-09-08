"use strict";

require("dotenv").config();
const express = require("express");
const server = express();
const PORT = process.env.PORT;
const weatherdata = require("./Data/weather.json");
const cors = require("cors");
server.use(cors());
const Weather=require('./weather.js')
const Movie=require('./movies')

server.listen(PORT, () => {
  console.log(`Hello this is PORT ${PORT}`);
});

// http://localhost:3010/weather?lat=lat&lon=lon
server.get("/weather",Weather);

// http://localhost:3010/movies?moviename=q
server.get("/movies",Movie)




