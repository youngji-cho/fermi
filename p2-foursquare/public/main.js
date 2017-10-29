// Foursquare API Info
const clientId = '2Z2QU4SG2JIBF44CDTFNK0N5H55MTSWBY4251DCM2TKT4UJQ';
const clientSecret = 'C02KBC2SGNXE4P0UQI3NPIQZTUQNOIOJV2PBKJ0XPIQTSKKJ';
const url = 'https://api.foursquare.com/v2/venues/explore';
const imgPrefix = 'https://igx.4sqi.net/img/general/150x200';

// APIXU Info
const apiKey = '01633825557a4e2ab0e03756171810';
const forecastUrl = ' http://api.apixu.com/v1/forecast.json?key=';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// AJAX functions
async function getVenues(){
  const city =$input.val();
  const urlToFetch = url + city + '&venuePhotos=1&limit=10&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20170305';

  try {
    let response= await fetch(urlToFetch);
    if (response.ok){
      let jsonResponse= await response.json();
      let venues = jsonResponse.response.groups[0].items.map(location => location.venue);
      return venues;
    }
  } catch (error) {
    console.log(error);
  }
};

async function getForecast(){
  const urlToFetch = forecastUrl + apiKey + '&q=' + $input.val() + '&days=4&hour=11';

  try {
    let response =await fetch(urlToFetch);
    if (response.ok){
      let jsonResponse = await response.json();
      let days = jsonResponse.forecast.forecastday;
      return days;
    	}
    }
  } catch (error) {
    console.log(error);
  }
};


// Render functions
function renderVenues(venues) {
  $venueDivs.forEach(($venue, index) => {
    let venueContent =
      '<h2>' + venues[index].name + '</h2>' +
      '<img class="venueimage" src="' + imgPrefix +
      '<img suffix>' + '"/>' +
      '<h3>Address:</h3>' +
      '<p>' + '<address>' + '</p>' +
      '<p>' + '<city>' + '</p>' +
      '<p>' + '<country>' + '</p>';
    $venue.append(venueContent);
  });
  $destination.append('<h2>' + venues[0].location.city + '</h2>');
}

function renderForecast(days) {
  $weatherDivs.forEach(($day, index) => {
    let weatherContent =
      '<h2> High: ' + '<max temp>' + '</h2>' +
      '<h2> Low: ' + '<min temp>' + '</h2>' +
      '<img src="http://' + '<icon>' +
      '" class="weathericon" />' +
      '<h2>' + '<day of the week>' + '</h2>';
    $day.append(weatherContent);
  });
}

function executeSearch() {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDivs.forEach(day => day.empty());
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues();
  getForecast();
  return false;
}

$submit.click(executeSearch)
