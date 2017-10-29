// Page Elements
const engadget = document.getElementById('engadget');
const recode = document.getElementById('recode');
const nextWeb = document.getElementById('nextWeb');
const main = document.getElementsByTagName('main')[0];

// News API Data

const apiKey = '8f022d8994884569a997af82d3f668f2';
const engadgetUrl = ' https://newsapi.org/v1/articles?source=engadget';
const recodeUrl = 'https://newsapi.org/v1/articles?source=recode';
const nextWebUrl = 'https://newsapi.org/v1/articles?source=the-next-web';

// Request News Function
async function getNews(url) {
  let response= await fetch(url);
  let jsonResponse = await response.json();
  let articlesArray = jsonResponse.articles.slice(0, 5);

  return articlesArray;
}

// Render Function

function renderNews(articles) {
  articles.map((article, index) => {
    let articleRow =
      '<div class="articlerow">' +
      ' <div class="article">' +
      '   <h2 class="title">' + article.title + '</h2>' +
      '   <h3>By ' + article.author + '</h3>' +
      '   <p> ' + article.description + '</p>' +
      '   <a href="' + article.url + '" target="_blank" class="readmore"><p>Read More</p></a>' +
      ' </div>' +
      ' <div class="share">' +
      '   <img class="storyimage" src="' + article.image.url + '" />' +
      '   <a href="https://twitter.com/<your user name>" target="_blank"><button type="button" class="tweet" id="tweet ' + index + '">' +
      '   <i class="fa fa-twitter" aria-hidden="true"></i>Tweet This</button></a>' +
      ' </div>' +
      '</div>';

    main.innerHTML += articleRow;
  }).then(articles => renderNews(articles));
  return articles;
}

// Post Tweet Function

function sendTweets(newsObjects) {
  let tweetButtons = document.getElementsByClassName('tweet');
  for (let i = 0; i < tweetButtons.length; i++) {
    tweetButtons[i].addEventListener('click', function() {

      tweetButtons[i].innerHTML = "Tweeted";
    }, false);
  }
}

engadget.addEventListener('click', function() {
  getNews(engadgetUrl);
  main.innerHTML = ' ';
  // Call getNews() here
}, false);

recode.addEventListener('click', function() {
  getNews(recodeUrl);
  main.innerHTML = ' ';
  // Call getNews() here
}, false);

nextWeb.addEventListener('click', function() {
  getNews(nextWebUrl);
  main.innerHTML = ' ';
  // Call getNews() here
}, false);
