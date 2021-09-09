const { default: axios } = require("axios");
let myMemory={};
let moviesFunction= async function(req,res){
    const movieName = req.query.moviename;
    if(myMemory[movieName] !== undefined){
        res.send(myMemory[movieName]);
      }else{
    const Key = process.env.MOVIE_API_KEY;
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${Key}&query=${movieName}`
    let moviesData= await axios.get(URL)
    let moviesArray=[];
    
    moviesArray=moviesData.data.results.map(item=>{
        return new MoviesCreator(item)
    })
    myMemory[movieName]=moviesArray;
    res.status(200).send(moviesArray);

}
}
function MoviesCreator(movie){
    this.title = movie.title
    this.overview = movie.overview
    this.average_votes = movie.vote_average
    this.total_votes = movie.vote_count
    this.image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    this.popularity = movie.popularity
    this.released_on = movie.release_date
}

module.exports=moviesFunction;