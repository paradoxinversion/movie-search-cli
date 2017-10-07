const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const movieSearch = require("./movie-search");
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')));

app.get('/api/imdb/search/:query', function(request, response){

  // response.send(`${request.params.query}`);
  movieSearch.runSearch(request.params.query).then(data =>{
    response.send(data);
  });
  // response.json(movieSearch.runSearch(request.params.query));
});

app.listen(3000, function(){
  console.log("App is live");
});
