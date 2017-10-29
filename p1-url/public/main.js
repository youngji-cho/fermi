// Include data for accessing Google APIs
const apiKey= "AIzaSyAhMOmH-SgGoNFR4vWj_k_SyR0wjxjSfYQ";
const url = 'https://www.googleapis.com/urlshortener/v1/url';

// Some page elements
const $inputField = $('#input');
const $expandButton =$('#expand');
const $shortenButton =$('#shorten');
const $responseField = $('#responseField');

// AJAX functions
async function expandUrl() {
  const urlToExpand = url + '?shortUrl=' + $inputField.val() + '&key=' + apiKey;
  try {
    let response = await fetch(urlToExpand);
    if (response.ok){
      let jsonResponse = await response.json();
      $responseField.append('<p> Your expandede URL is <p></p>' + jsonResponse.longUrl+'</p>');
      return jsonResponse;
    }
  } catch(error){
    console.log(error);
  }
}

async function shortenUrl() {
  const urlToShorten = $inputField.val();
  const urlWithKey = url + '?key=' + apiKey;

  try {
    let response = await fetch(urlWithKey,{
      method : 'POST',
      body: JSON.stringify({longUrl: urlToShorten}),
      headers : {"Content-type": "application/json"}
    });
    if (response.ok){
      let jsonResponse = await response.json();
      $responseField.append('<p> Your shortened url is <p></p>' + jsonResponse.id + '</p>');
      return jsonResponse;
    }
  } catch(error) {
    console.log(error);
  }
}

function expand() {
  $responseField.empty();
  expandUrl();
  return false;
};

function shorten() {
  $responseField.empty();
  shortenUrl();
  return false;
};

// Call the functions when the appropriate button is clicked

$expandButton.click(expand);
$shortenButton.click(shorten);
