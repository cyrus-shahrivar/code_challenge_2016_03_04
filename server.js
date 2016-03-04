//TODO: use weather API http://openweathermap.org/current
//
//

var express = require('express');
var logger = require('morgan');
var request = require('request');
var app = express();


app.use(logger('dev'));

app.use(express.static('public'));

app.listen(3000, function () {
  console.log("hi, on port 3000");
});

app.get('/', function (req, res) {
  // leaving blank
});

app.get('/kittens', function (req, res) {
  request("http://api.giphy.com/v1/gifs/search?q=kittens&api_key=dc6zaTOxFJmzC&limit=20", function(error, response, body){
    res.send(body);
  });
});

app.get('/searchGif/:searchParameter', function (req, res) {
  request("http://api.giphy.com/v1/gifs/search?q=" + req.params.searchParameter + "&api_key=dc6zaTOxFJmzC&limit=1", function(error, response, body){
    res.send(body);
  });
});
