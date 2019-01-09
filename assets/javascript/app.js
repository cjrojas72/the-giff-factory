
var giffBttns = ["The Matrix", "Patrick", "cats", "force choke"];

function displayGiffInfo(){

  $("#giff-display").empty();
  var giff = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giff + "&api_key=9ASIq0TfeX1N4Hn2ASeJDMzSXHASNOr7&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response){

    results = response.data;
    console.log(response);

    for(var i=0; i <results.length; i++){
      var giffDiv = $("<div class='giff'>");
      giffDiv.addClass("col");
    
      var $rating = results[i].rating;
      var imgURL = results[i].images.original.url;

      var rate = $("<p>").text("Rating: " + $rating);
      var image = $("<img>").attr("src", imgURL);

      giffDiv.append(rate);
      giffDiv.append(image);

    $ ("#giff-display").prepend(giffDiv);
    }
  }); 
}

function renderBttns(){
  $("#bttn-display").empty();

  for (var i = 0; i < giffBttns.length; i++) {

    
    var a = $("<button>");
  
    a.addClass("giff-btn m-2");
  
    a.attr("data-name", giffBttns[i]);
    
    a.text(giffBttns[i]);
    
    $("#bttn-display").append(a);
  }
}

$("#add-giff").on("click", function() {
        
  event.preventDefault();
  var giff = $("#giff-input").val().trim();
       
  giffBttns.push(giff);

  renderBttns();
});

$(document).on("click", ".giff-btn", displayGiffInfo);
renderBttns();