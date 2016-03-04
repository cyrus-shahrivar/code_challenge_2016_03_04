$(function(){
  $("#name-search-button").on('click', getSearchByNameGif);
  $("#kittens").on('click', getKittens);
});

var getSearchByNameGif = function(){
  var searchTerm = $("#name-search-input").val();
  $.get('/searchGif/' + searchTerm).done(renderGif);
};

var getKittens = function() {
  $.get('/kittens').done(renderGif);
};

var renderGif = function(gifs) {

  var gifList = JSON.parse(gifs).data;

  gifList.forEach(function(gif){
    var gifURL = gif.images.original.url;

    var ulTag = $('<ul>');
    ulTag.html("<img src=" + gifURL + ">");
    $('body').append(ulTag);
  });
};
