var express = require('express');
var logger = require('morgan');
var request = require('request');
var app = express();
var d3 = require('d3');

// console output for debugging
app.use(logger('dev'));

// api_key hidden in environmental variable
var api_key = process.env.WEATHER_SECRET;

app.set('port', (process.env.PORT || 5000));

// serve the public folder's static assets by default
app.use(express.static(__dirname + '/public'));
app.get('/', function(request, response) {
  response.render('public/index.html');
});

// message on nodemon to verify server is up
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// API hitpoint 1: search the city's currrent weather
app.get('/currentWeather/:city', function (req, res) {
  request("http://api.openweathermap.org/data/2.5/weather?q=" + req.params.city + "&appid=" + api_key, function(error, response, body){
    res.send(body);
  });
});

// API hitpoint 2: search the city's 5-day forecast
app.get('/5dayForecast/:city', function (req, res) {
  request("http://api.openweathermap.org/data/2.5/forecast?q=" + req.params.city + "&appid=" + api_key, function(error, response, body){
    res.send(body);
  });
});
