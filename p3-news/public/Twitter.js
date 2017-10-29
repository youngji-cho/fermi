const Twitter = {};

const oauthConsumerKey = 'NQPw0tkWP6KGeZcI5yvNqTULb'; // Generated from apps.twitter.com
const oauthConsumerSecret = '6rZh5ZGDHniSEw7K5TrB9lPumK6aY80KKgDiNhLnhFzJ5Fwpcq'; // Generated from Keys and Access Tokens on apps.twitter.com
const oauthToken = '769650450-TjhoG6ArGmJPyNAnpmxUoTBP61sxwSEv998YuLOe'; // Generated from Keys and Access Tokens on apps.twitter.com
const oauthTokenSecret = 'IJP2Tb9OFKwhGBiJdfFb9pcyJXxHmErdIqybRxOlUK1GG';
; // Generated from Keys and Access Tokens on apps.twitter.com
const oauthSignatureMethod = 'HMAC-SHA1';
const oauthVersion = '1.0';
const baseUrl = 'https://api.twitter.com/1.1/statuses/update.json';

// Post Status Function
Twitter.postStatus = async (status) => {
  let urlFromInstructions = fetch( `https://cors-anywhere.herokuapp.com/${baseUrl}?status=${encodeData(status)}`);
  let response = await fetch(urlFromInstructions, {});
  Twitter.generateAuthorizationHeader(status)

  let jsonResponse = await response.json();
};
// Helper Functions

Twitter.generateAuthorizationHeader = (status) => {
  const oauthNonce = generateNonce();
  const oauthTimestamp = Math.floor((new Date()).getTime() / 1000);
  const oauthSignature = generatePostSignature(status, baseUrl, oauthNonce, oauthTimestamp);

  let authorizationHeader = `Oauth oauth_consumer_key="${encodeData(oauthConsumerKey)}", oauth_nonce="${encodeData(oauthNonce)}", oauth_signature="${encodeData(oauthSignature)}", oauth_signature_method="${encodeData(oauthSignatureMethod)}", oauth_timestamp="${encodeData(oauthTimestamp)}", oauth_token="${encodeData(oauthToken)}", oauth_version="${encodeData(oauthVersion)}"`;

  return authorizationHeader;
};

NONCE_CHARS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B',
  'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
  'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3',
  '4', '5', '6', '7', '8', '9'
];

const generateNonce = () => {
  var result = [];
  var chars = NONCE_CHARS;
  var char_pos;
  var nonce_chars_length = chars.length;

  for (var i = 0; i < 32; i++) {
    char_pos = Math.floor(Math.random() * nonce_chars_length);
    result[i] = chars[char_pos];
  }
  return result.join('');
};

const generatePostSignature = (status, url, oauthNonce, oauthTimestamp) => {
  const parameterString = `oauth_consumer_key=${encodeData(oauthConsumerKey)}&oauth_nonce=${encodeData(oauthNonce)}&oauth_signature_method=HMAC-SHA1&oauth_timestamp=${encodeData(oauthTimestamp)}&oauth_token=${encodeData(oauthToken)}&oauth_version=1.0&status=${encodeData(status)}`;
  const signatureBase = `POST&${encodeData(url)}&${encodeData(parameterString)}`;
  const signingKey = `${encodeData(oauthConsumerSecret)}&${encodeData(oauthTokenSecret)}`;

  return HMACSHA1(signingKey, signatureBase);
};

const encodeData = (toEncode) => {
  if (toEncode == null || toEncode == "") return "";
  else {
    var result = encodeURIComponent(toEncode);
    // Fix the mismatch between OAuth's  RFC3986's and Javascript's beliefs in what is right and wrong ;)
    return result.replace(/\!/g, "%21")
      .replace(/\'/g, "%27")
      .replace(/\(/g, "%28")
      .replace(/\)/g, "%29")
      .replace(/\*/g, "%2A");
  }
};
