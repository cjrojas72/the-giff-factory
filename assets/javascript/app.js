

//array that will hold all items to be made into a giff button
var giffBttns = ["Batman", "Patrick", "cats", "force choke"];

// function that will display the giffs
function displayGiffInfo(){

  //clears out the current giffs
  $("#giff-display").empty();

  //sets the search paramater for the giff to be used in the ajax call
  var giff = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giff + "&api_key=9ASIq0TfeX1N4Hn2ASeJDMzSXHASNOr7&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response){

    results = response.data;
    console.log(response);

    //loops through response from the ajax call
    for(var i=0; i <results.length; i++){

      //creates div placeholder for giff
      var giffDiv = $("<div class='giff'>");
      giffDiv.addClass("col");

      // grabs giff data and sets to a variable
      var $rating = results[i].rating;
      var imgURL = results[i].images.original.url;

      //creates html elements for giffs
      var rate = $("<p>").text("Rating: " + $rating);
      var image = $("<img>").attr("src", imgURL);

      //adds giff content to placeholders
      giffDiv.append(rate);
      giffDiv.append(image);

    $ ("#giff-display").prepend(giffDiv);
    }
  }); 
}

//creates giff buttons that will call giffs 
function renderBttns(){
  
  $("#bttn-display").empty();

  //loops through giffBttns to create giff buttons
  for (var i = 0; i < giffBttns.length; i++) {

    var a = $("<button>");
  
    a.addClass("giff-btn m-2");
    a.attr("data-name", giffBttns[i]);
    a.text(giffBttns[i]);
    
    $("#bttn-display").append(a);
  }
}

//grabs user input to add to giff buttons
$("#add-giff").on("click", function() {
        
  event.preventDefault();

  var giff = $("#giff-input").val().trim();

  giffBttns.push(giff);

  renderBttns();
});

//when a giff button is pressed it will display giffs. This will happen when document is loaded. 
$(document).on("click", ".giff-btn", displayGiffInfo);
renderBttns();