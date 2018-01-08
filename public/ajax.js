var url ="http://localhost:8081/AjaxRequest.jsp?getUrl=http://apis.data.go.kr/1611000/BldRgstService/getBrBasisOulnInfo?sigunguCd=11680&bjdongCd=10300&bun=0012&ji=0000&ServiceKey=8PZnRzZb4yXsXJQVBDX74xuf8kHhF4cmY5XnEO9apteNWtahGwpA9%2FjrthHB0tX7GBlm9zN1A%2F0rKCx3wGe27g%3D%3D";

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Content-Type', 'application/xml');
  xhttp.setRequestHeader('Content-Type', 'application/xml');
  xhttp.withCredentials = true;
  xhttp.send();
}
function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  console.log(xmlDoc);
}
