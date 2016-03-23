$(function(){
  // button event listeners
  $("#current-search-button").on('click', getCurrentWeather);
  $("#fiveDay-search-button").on('click', get5dayForecast);
});

// // runs weather request and rendering functions
// var getWeather = function(){
//   getCurrentWeather();
//   get5dayForecast();
// };

// current weather request
var getCurrentWeather = function(){
  var searchTerm = $("#name-search-input").val();
  $.get('/currentWeather/' + searchTerm).done(renderCurrentWeather);
};

// 5-day forecast weather request
var get5dayForecast = function(){
  var searchTerm = $("#name-search-input").val();
  $.get('/5dayForecast/' + searchTerm).done(renderForecast);
};

// temp units conversion
var kelvinToFahrenheit = function(kelvin){
  return kelvin * (9.0/5.0) - 459.67;
};

var renderCurrentWeather = function(weather) {
  var info = JSON.parse(weather);

  // turns on weather div element and clears last data
  $("#currentWeather").css("display", "block");
  $("#currentWeatherSubTitle").css("display", "block");
  $("#currentWeather").html("");

  // adds title
  var title = $("#currentWeatherSubTitle");
  title.html("Current Weather: " + $("#name-search-input").val());

  //adds elements from weather JSON data
  var currentWeather = $("<h4>");
  currentWeather.addClass("weatherElement");
  currentWeather.html(info.weather[0].description.toUpperCase());
  $("#currentWeather").append(currentWeather);

  var temp = $("<p>");
  temp.addClass("weatherElement");
  temp.html(Math.round(kelvinToFahrenheit(info.main.temp)) + "\&#8457;");
  $("#currentWeather").append(temp);

  var wind = $("<p>");
  wind.addClass("weatherElement");
  wind.html("Wind: " + info.wind.speed + " MPH");
  $("#currentWeather").append(wind);

  var humidity = $("<p>");
  humidity.addClass("weatherElement");
  humidity.html("Humidity: " + info.main.humidity + "%");
  $("#currentWeather").append(humidity);
};

var renderForecast = function(weather) {
  var info = JSON.parse(weather);
  console.log(info);

  // turns on weather div element and clears last data
  $("#forecastWeatherSubTitle").css("display", "block");
  $("#forecastWeather").html("");

  // adds title
  var title = $("#forecastWeatherSubTitle");
  title.html("5-Day Forecast: " + $("#name-search-input").val());

  // d3 chart code below
  var width = window.innerWidth,
  barHeight = 20;

  // creates SVG element
  var svg = d3.select("#forecastWeather").append("svg")
      .attr("width", width)
      .attr("height", barHeight * info.list.length + 100);

  // creates chart scale
  var x = d3.scale.linear()
      .domain([0, 150])
      .range([0, width]);

  // adds graphics group
  var bar = svg.selectAll("g")
      .data(info.list)
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(200," + i * barHeight + ")"; });

  // rendering of each bar
  bar.append("rect")
      .attr("width", function(d) { return x(Math.round(kelvinToFahrenheit(d.main.temp))) - 3; })
      .attr("height", barHeight - 1);

  // rendering of text
  bar.append("text")
      .attr("x", function(d) { return x(Math.round(kelvinToFahrenheit(d.main.temp))) - 5; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) {
        var returnString = "";
        if (/clear/.test(d.weather[0].description)) {
          returnString += "☀︎";
        } else if (/rain/.test(d.weather[0].description)) {
          returnString += "☂";
        } else if (/clouds/.test(d.weather[0].description)) {
          returnString += "☁︎";
        } else {
          returnString += d.weather[0].description;
        }
        return returnString + " " + Math.round(kelvinToFahrenheit(d.main.temp)) + "ºF";
      });

    // time formattting and getting for axis rendering
    var format = d3.time.format("%Y-%m-%d %X");
    var tstart = format.parse(info.list[0].dt_txt),
        tend = format.parse(info.list[38].dt_txt);

    // time axis scaling
    var y = d3.time.scale()
        .domain([tstart, tend])
        .range([0, barHeight * info.list.length]);

    // time axis generation
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    // time axis rendering
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(100," + 0 + ")")
        .call(yAxis)
      .selectAll("text")
        .attr("y", 0)
        .attr("x", 6)
        .style("fill", "black")
        .style("text-anchor", "start");


};
