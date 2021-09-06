"use strict";

require("dotenv").config();
const express = require("express");
const server = express();
const PORT = process.env.PORT;
const weatherdata = require("./assets/data.json");
const cors = require("cors");
server.use(cors());

server.listen(PORT, () => {
  console.log(`Hello this is PORT ${PORT}`);
});

// http://localhost:3010/weather?cityname=Seattle
server.get("/weather", (req, res) => {
  const cityname = req.query.cityname;
    if (cityname === "Amman") {
        res.send(weatherdata[2]); 
    } else if (cityname === "Paris") {
        res.send(weatherdata[1]); 
    } else if (cityname === "Seattle") {
        res.send(weatherdata[0]); 
    }else{
        res.send('Sorry Error');
    }
});
