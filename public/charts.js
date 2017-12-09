google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(smp_chart);
google.charts.setOnLoadCallback(rec_chart);

const smp_url= 'https://docs.google.com/spreadsheets/d/1_WuRPqGhuuj7lGJn286_oU35kgUaMZ-fwpEzKART9L8/gviz/tq?sheet=SMP&header=1&range=A1:B200&tq=';
const rec_url= 'https://docs.google.com/spreadsheets/d/1_WuRPqGhuuj7lGJn286_oU35kgUaMZ-fwpEzKART9L8/gviz/tq?sheet=REC&header=1&range=A1:B12&tq=';

function smp_chart(){
  let query = new google.visualization.Query(smp_url);
  query.send(smp_response);
}

function smp_response(res){
  if (res.isError()){
    alert('Error in query'+res.getMessage()+' '+res.getDetailedMessage());
    return;
  }
  let data=res.getDataTable();
  let option = {
    hAxis: {title: '시간'},
    vAxis: {title: 'SMP 가격'}
  }
  let chart= new google.visualization.LineChart(document.getElementById('smp_chart_div'));
  function selectHandler() {
    let selectedItem = chart.getSelection()[0];
    if (selectedItem) {
      var topping = data.getValue(selectedItem.row, 0);
      alert('The user selected ' + topping);
    }
  }
  chart.draw(data,option);
}

function rec_chart(){
  let query = new google.visualization.Query(rec_url);
  query.send(smp_response);
}

function rec_response(res){
  if (res.isError()){
    alert('Error in query'+res.getMessage()+' '+res.getDetailedMessage());
    return;
  }
  let data= res.getDataTable();
  let option ={
    hAxis: {title: '시간'},
    vAxis: {title: 'SMP 가격'}
  }
  let chart = new google.visualization.LineChart(document.getElementById('rec_chart_div'));
  function selectHandler() {
    let selectedItem = chart.getSelection()[0];
    if (selectedItem) {
      var topping = data.getValue(selectedItem.row, 0);
      alert('The user selected ' + topping);
    }
  }
  google.visualization.events.addListener(chart, 'select', selectHandler);
  chart.draw(data,option);
}
