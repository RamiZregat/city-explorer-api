"use strict";

require("dotenv").config();
const express = require("express");
const server = express();
const PORT = process.env.PORT;
const weatherdata = require("./Data/weather.json");
const cors = require("cors");
server.use(cors());

server.listen(PORT, () => {
  console.log(`Hello this is PORT ${PORT}`);
});

// http://localhost:3010/weather?lat=lat&lon=lon
server.get("/weather", (req, res) => {
  const lon = req.query.lon;
  const lat = req.query.lat;
  let weatherArray=[];
    const result = weatherdata.find(item =>{
        if(item.lat === lat && item.lon === lon)
        {
        
         weatherArray=item.data.map(day => {
                return new Forcast(day)
            })
        }       
    })
    
    res.send(weatherArray);
});


function Forcast(day){
    this.date=day.valid_date
    this.description=`Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`
}