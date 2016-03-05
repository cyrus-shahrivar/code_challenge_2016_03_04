$(function(){
  $("#name-search-button").on('click', getSearchByNameGif);
  $("#city").on('click', getCity);
});

var getSearchByNameGif = function(){
  var searchTerm = $("#name-search-input").val();
  console.log(searchTerm);
  $.get('/searchCity/' + searchTerm).done(renderCity);
};

var getCity = function() {
  $.get('/Nashville,TN').done(renderCity);
};

var renderCity = function(gifs) {
  var info = JSON.parse(gifs);
  console.log(info);
  // var gifList = JSON.parse(gifs).data;
  // console.log(gifList);

  // gifList.forEach(function(gif){
  //   var gifURL = gif.images.original.url;
  //
  //   var ulTag = $('<ul>');
  //   ulTag.html("<img src=" + gifURL + ">");
  //   $('body').append(ulTag);
  // });
};
