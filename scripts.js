let currentDate = moment().format("l");

$("#dateDiv").text(currentDate);




//  Search button click event
$(".searchBtn").on('click',function(event){
    event.preventDefault();
   var inputText = $(event.target).siblings("input")
   console.log(inputText.val());
   let cityName = inputText.val();
   localStorage.setItem('mostRecentCity', cityName);

//    Add text to city name div
 $("#cityDiv").text(inputText.val());



// Current weather
 var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=90f207048ae63b6cb40d90f49ace5dfc"
 $.ajax({
    url: queryURL,
    method: "GET"
  })
   
     .then(function(response) {
console.log(response.main.temp)
    // Define variables
          var currentTemp = response.main.temp;
          var currentHumidity = response.main.humidity;
          var currentWindSpeed = response.wind.speed;
          var cityLat=response.coord.lat;
          var cityLon=response.coord.lon;
        
    // Insert variables into corresponding divs
          $("#currentTempDiv").text("Temperature: " + currentTemp + " °F"); 
          $("#currentHumidityDiv").text("Humidity: " + currentHumidity + "%"); 
          $("#currentWindDiv").text("Wind Speed: " + currentWindSpeed); 
        //   Find current weather icon
        var currentIcon = response.weather[0].icon
        var queryICONurl = "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png"

        // Empty the div before adding new icon
        $("#iconDiv").empty();
        // Display on page
        $(`<img src='${queryICONurl}'>`).appendTo('#iconDiv');

        // To find UV index, coordinates must be used from previous query
          var queryUVurl="http://api.openweathermap.org/data/2.5/uvi?appid=90f207048ae63b6cb40d90f49ace5dfc&lat=" + cityLat + "&lon=" + cityLon
          $.ajax({
            url: queryUVurl,
            method: "GET"
          })
          .then(function(response) {
            console.log(response);

            var currentUV = response.value;
            $("#currentUVDiv").text("UV Index: " + currentUV); 
          })

         // Get search history from local storage
          const cityHistory = JSON.parse(localStorage.getItem('cityHistory')) || [];
        //   add new items to the beginning of the array
          cityHistory.unshift(cityName);
        //    set the cityhistory key to pair with the string cityHistory
          localStorage.setItem('cityHistory', JSON.stringify(cityHistory));
          // targets the history div
          const historyList = document.getElementById('historyDiv');
           // Limits the history list to 8 items
          cityHistory.splice(8);

// Print search history to page
historyList.innerHTML = cityHistory
// Create list elements for each history item
  .map(cityHistory => {
    return `<li class="high-score">${cityHistory}</li>`;
  })
  .join("");
})
     })

// Function to pull previous searches from local storage upon page loading
function generateHistory(){
    // if there is not already one, create the cityHistory array
    const cityHistory = JSON.parse(localStorage.getItem('cityHistory')) || [];
    // targets the history div
    const historyList = document.getElementById('historyDiv');
    // Limits the history list to 8 items
    cityHistory.splice(8);
    // Print search history to page
historyList.innerHTML = cityHistory
// Create list elements for each history item
  .map(cityHistory => {
    return `<li class="high-score">${cityHistory}</li>`;
  })
  .join("");
}
generateHistory();