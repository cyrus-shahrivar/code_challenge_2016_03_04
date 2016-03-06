$(function(){
  $("#name-search-button").on('click', getSearchByNameGif);
});

var getSearchByNameGif = function(){
  var searchTerm = $("#name-search-input").val();
  console.log(searchTerm);
  $.get('/searchCity/' + searchTerm).done(renderCity);
};

var kelvinToFahrenheit = function(kelvin){
  return kelvin * (9.0/5.0) - 459.67;
};

var renderCity = function(weather) {
  var info = JSON.parse(weather);
  console.log(info);

  // turns on weather div element and clears last data
  $("#weatherArea").css("display", "block");
  $("#weatherArea").html("");

  //adds elements from weather JSON data
  var currentWeather = $("<h4>");
  currentWeather.addClass("weatherElement");
  currentWeather.html(info.weather[0].description.toUpperCase());
  $("#weatherArea").append(currentWeather);

  var temp = $("<p>");
  temp.addClass("weatherElement");
  temp.html(Math.round(kelvinToFahrenheit(info.main.temp)) + "\&#8457;");
  $("#weatherArea").append(temp);

  var wind = $("<p>");
  wind.addClass("weatherElement");
  wind.html("Wind: " + info.wind.speed + " MPH");
  $("#weatherArea").append(wind);

  var humidity = $("<p>");
  humidity.addClass("weatherElement");
  humidity.html("Humidity: " + info.main.humidity + "%");
  $("#weatherArea").append(humidity);
};
