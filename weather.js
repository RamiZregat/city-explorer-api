
const { default: axios } = require("axios");
let weatherFunction= async function(req, res){
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
      res.status(200).send(weatherArray);
  };


  function Forcast(day){
    this.date=day.valid_date
    this.description=`Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`
}
module.exports=weatherFunction;