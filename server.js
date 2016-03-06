//DONE: use weather API http://openweathermap.org/current
//TODO: Now that data can be accessed by City for current weather data
//TODO: CONT. FROM. ABOVE. next up is style and viz

var express = require('express');
var logger = require('morgan');
var request = require('request');
var app = express();
var d3 = require('d3');

app.use(logger('dev'));

var api_key = process.env.WEATHER_SECRET;

app.use(express.static('public'));

app.listen(3000, function () {
  console.log("hi, on port 3000");
});

app.get('/', function (req, res) {
  // leaving blank
});

app.get('/currentWeather/:city', function (req, res) {
  request("http://api.openweathermap.org/data/2.5/weather?q=" + req.params.city + "&appid=" + api_key, function(error, response, body){
    res.send(body);
  });
});

app.get('/5dayForecast/:city', function (req, res) {
  request("http://api.openweathermap.org/data/2.5/forecast?q=" + req.params.city + "&appid=" + api_key, function(error, response, body){
    res.send(body);
  });
});
