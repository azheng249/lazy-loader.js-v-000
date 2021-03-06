"use strict";

// this is the base API url
var baseUrl = "http://mimeocarlisting.azurewebsites.net/api/cars/";
var numberOfCars = 3;
var batchCounter = 3;

function formatCars(carsJSON) {
  // this function shold return a string of properly formatted html
  // refer to app/views/index.erb lines 16 - 22 for an example of how
  // to format three cars, each in a div with a class "col-md-4", in a 
  // div with a class "row"

  var html = "<div class=\"row\">";

  // For each car in the JSON, add a bootstrapped column with that car's info into the html variable
  carsJSON.forEach(function(car) {
    html += 
        "<div class=\"col-md-4 car\">" + 
          "<h2>" + car['Make'] + "</h2>" +
          "<p><strong>Model:</strong> " + car['Model'] + "</p>" +
          "<p><strong>Year:</strong> " + car['Year'] + "</p>" +
        "</div>"
  });

  html += "</div>";

  return html;
}

function addCarsToDOM(carsJSON) {
  // this function should pass carsJSON to formatCars() and then 
  // add the resulting HTML to the div with an id of "cars"

  var loadedCarsHTML = formatCars(carsJSON);
  $("#cars").append(loadedCarsHTML);
}

function fetchJSON() {
  // this function will make the ajax call
  // on success of the ajax call, it will pass the returned data
  // to addCarsToDOM()

  $.ajax({
    url: baseUrl + batchCounter + "/" + numberOfCars,
    contentType: 'application/json',
    dataType: 'jsonp'

  }).done(function(data){
    addCarsToDOM(data);
    batchCounter += 1;

  }).fail(function(error){
    console.log("Something went wrong: " + error);
    alert("Could not load more car info");
  });

}