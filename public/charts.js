google.charts.load('current', {'packages':['corechart', 'controls']});
google.charts.setOnLoadCallback(smp_chart);
google.charts.setOnLoadCallback(rec_chart);

const smp_url= 'https://docs.google.com/spreadsheets/d/1_WuRPqGhuuj7lGJn286_oU35kgUaMZ-fwpEzKART9L8/gviz/tq?sheet=SMP&header=1&range=A1:B200&tq=';
const rec_url= 'https://docs.google.com/spreadsheets/d/1_WuRPqGhuuj7lGJn286_oU35kgUaMZ-fwpEzKART9L8/gviz/tq?sheet=REC&header=1&range=A1:B64&tq=';

function smp_chart(filter){
  let filter_url=encodeURIComponent(filter);
  let query_url=smp_url+filter_url;
  let query = new google.visualization.Query(query_url);
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

function rec_chart(filter){
  let filter_url=encodeURIComponent(filter);
  let query_url=rec_url+filter_url;
  let query = new google.visualization.Query(query_url);
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

$(function(){
  function smp_filter_func(callback){
    $('#smp_filter').html('<select name="smp_filter" onChange="smp_chart(this.value)"> <option id="smp_default" value="select A, B where A > date \'2014-7-01\'"> 최근 3개월 </option> <option value="select A, B where A > date \'2016-9-01\'"> 최근 1년 </option> <option value="select A, B where A > date \'2014-9-01\'"> 최근 3년 </option> <option value="select A, B"> 전체 </option></select>');
    callback();
  }
  smp_filter_func(function smp_callback(){
    smp_chart($("#smp_default").attr("value"));
  });
});

$(function(){
  $('#rec_filter').html('<select name="smp_filter" onChange="rec_chart(this.value)"> <option id="rec_default" value="select A, B where A > date \'2017-3-28\'"> 통합시장이후 </option> <option value="select A, B where A < date \'2017-3-28\'"> 통합시장이전 </option> <option value="select A, B"> 전체 </option></select>');
});
