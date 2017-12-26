google.charts.load('current', {'packages':['corechart', 'controls']});
google.charts.setOnLoadCallback(smp_chart);
google.charts.setOnLoadCallback(rec_chart);

const smp_url= 'https://docs.google.com/spreadsheets/d/1_WuRPqGhuuj7lGJn286_oU35kgUaMZ-fwpEzKART9L8/gviz/tq?sheet=SMP&header=1&range=A1:B200&tq=';

const rec_url= 'https://docs.google.com/spreadsheets/d/1_WuRPqGhuuj7lGJn286_oU35kgUaMZ-fwpEzKART9L8/gviz/tq?sheet=REC&header=1&range=A1:B64&tq=';

function smp_chart(){
  let query = new google.visualization.Query(smp_url);
  query.send(smp_chartboard);
}

function smp_chartboard(res){
  let data = res.getDataTable();
  let chart  = new google.visualization.LineChart(document.getElementById('smp_chart_div'));

  let options ={
    'title':'월간 가중평균 계통한계가격 그래프',
     'legend':{
       'position':'bottom'
     }
  };
  chart.draw(data,options);
}

function rec_chart(){
  let query = new google.visualization.Query(rec_url);
  query.send(rec_chartboard);
}

function rec_chartboard(res){
  let data = res.getDataTable();
  let chart  = new google.visualization.LineChart(document.getElementById('rec_chart_div'));

  let options ={
    'title':'REC 도매시장 가격 그래프',
    'legend':{
       'position':'bottom'
     }
  };
  chart.draw(data,options);
}

$(window).resize(function(){
  smp_chart();
  rec_chart();
});


document.getElementById("smp_filter_div").innerHTML= "Hello World!"
