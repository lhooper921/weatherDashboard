// Set current date
let currentDate = moment().format("l");
// Set forecast dates
let forecastDate1 = moment().add(1, 'days').format("l")
let forecastDate2 = moment().add(2, 'days').format("l")
let forecastDate3 = moment().add(3, 'days').format("l")
let forecastDate4 = moment().add(4, 'days').format("l")
let forecastDate5 = moment().add(5, 'days').format("l")
// Display today's date
$("#dateDiv").text(currentDate);
// Display forecast dates
$("#date1").text(forecastDate1);
$("#date2").text(forecastDate2);
$("#date3").text(forecastDate3);
$("#date4").text(forecastDate4);
$("#date5").text(forecastDate5);

//  Search button click event
$(".searchBtn").on('click', function (event) {
  event.preventDefault();
  var inputText = $(event.target).siblings("input")
  console.log(inputText.val());
  let cityName = inputText.val();
  localStorage.setItem('mostRecentCity', cityName);
  citySearch(cityName);
  //    Add text to city name div
  $("#cityDiv").text(inputText.val());

})
function citySearch(cityVar) {

  // Current weather
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityVar + "&units=imperial&appid=90f207048ae63b6cb40d90f49ace5dfc"
  $.ajax({
    url: queryURL,
    method: "GET"
  })

    .then(function (response) {

      // Define variables
      var currentTemp = response.main.temp;
      var currentHumidity = response.main.humidity;
      var currentWindSpeed = response.wind.speed;
      var cityLat = response.coord.lat;
      var cityLon = response.coord.lon;

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
      var queryUVurl = "http://api.openweathermap.org/data/2.5/uvi?appid=90f207048ae63b6cb40d90f49ace5dfc&lat=" + cityLat + "&lon=" + cityLon
      $.ajax({
        url: queryUVurl,
        method: "GET"
      })
        .then(function (response) {
console.log(response);

          var currentUV = response.value;
          $("#currentUVDiv").text("UV Index: " + currentUV);
               // Add classes based on current UV index
//    if (currentUV <3) {
//     inputDiv.addClass('favorable');
// }
//     if (currentUV > 3 && currentUV<6) {
//  inputDiv.addClass('moderate');
// }
     if (currentUV >6) {
          inputDiv.addClass('unfavorable');
           }
        })
      

      // Get search history from local storage
      const cityHistory = JSON.parse(localStorage.getItem('cityHistory')) || [];
      //   add new items to the beginning of the array
      cityHistory.unshift(cityVar);
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
          return `<button class="cityLink">${cityHistory}</button>`;
        })
        .join("");
    })
  var forecast1QueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityVar + "&units=imperial&appid=90f207048ae63b6cb40d90f49ace5dfc"
  $.ajax({
    url: forecast1QueryURL,
    method: "GET"
  })
    .then(function (response) {
      

      var day1Temp = response.list[0].main.temp;
      var day1Humidity = response.list[0].main.humidity;

      var day2Temp = response.list[8].main.temp;
      var day2Humidity = response.list[8].main.humidity;

      var day3Temp = response.list[16].main.temp;
      var day3Humidity = response.list[16].main.humidity;

      var day4Temp = response.list[24].main.temp;
      var day4Humidity = response.list[24].main.humidity;

      var day5Temp = response.list[32].main.temp;
      var day5Humidity = response.list[32].main.humidity;

      //   Find Day 1 icon
      var forecastIcon1 = response.list[0].weather[0].icon
      var queryICON1url = "http://openweathermap.org/img/wn/" + forecastIcon1 + "@2x.png"

      // Empty the div before adding new icon
      $("#icon1").empty();
      // Display on page
      $(`<img src='${queryICON1url}'>`).appendTo('#icon1');

      //   Find Day 2 icon
      var forecastIcon2 = response.list[8].weather[0].icon
      var queryICON2url = "http://openweathermap.org/img/wn/" + forecastIcon2 + "@2x.png"

      // Empty the div before adding new icon
      $("#icon2").empty();
      // Display on page
      $(`<img src='${queryICON2url}'>`).appendTo('#icon2');

      //   Find Day 3 icon
      var forecastIcon3 = response.list[16].weather[0].icon
      var queryICON3url = "http://openweathermap.org/img/wn/" + forecastIcon3 + "@2x.png"

      // Empty the div before adding new icon
      $("#icon3").empty();
      // Display on page
      $(`<img src='${queryICON3url}'>`).appendTo('#icon3');

      //   Find Day 4 icon
      var forecastIcon4 = response.list[24].weather[0].icon
      var queryICON4url = "http://openweathermap.org/img/wn/" + forecastIcon4 + "@2x.png"

      // Empty the div before adding new icon
      $("#icon4").empty();
      // Display on page
      $(`<img src='${queryICON4url}'>`).appendTo('#icon4');

      //   Find Day 5 icon
      var forecastIcon5 = response.list[32].weather[0].icon
      var queryICON5url = "http://openweathermap.org/img/wn/" + forecastIcon5 + "@2x.png"

      // Empty the div before adding new icon
      $("#icon5").empty();
      // Display on page
      $(`<img src='${queryICON5url}'>`).appendTo('#icon5');

      // Insert variables into corresponding divs
      $("#temp1").text("Temperature: " + day1Temp + " °F");
      $("#humidity1").text("Humidity: " + day1Humidity + "%");

      $("#temp2").text("Temperature: " + day2Temp + " °F");
      $("#humidity2").text("Humidity: " + day2Humidity + "%");

      $("#temp3").text("Temperature: " + day3Temp + " °F");
      $("#humidity3").text("Humidity: " + day3Humidity + "%");

      $("#temp4").text("Temperature: " + day4Temp + " °F");
      $("#humidity4").text("Humidity: " + day4Humidity + "%");

      $("#temp5").text("Temperature: " + day5Temp + " °F");
      $("#humidity5").text("Humidity: " + day5Humidity + "%");

    })
}

// Function to pull previous searches from local storage upon page loading
function generateHistory() {
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
      return `<button class="cityLink">${cityHistory}</button>`;
    })
    .join("");
}
generateHistory();

//  Search button click event
$("#historyDiv").on('click',".cityLink",function (event) {

  event.preventDefault();
  let btnText = $(this)[0].innerHTML




  citySearch(btnText);
  $("#cityDiv").text(btnText);
})