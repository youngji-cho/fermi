google.charts.load('current', {'packages':['corechart', 'controls']});
google.charts.setOnLoadCallback(smp_main_chart);
google.charts.setOnLoadCallback(rec_main_chart);

const smp_main_url= 'https://docs.google.com/spreadsheets/d/1_WuRPqGhuuj7lGJn286_oU35kgUaMZ-fwpEzKART9L8/gviz/tq?gid=1369637042&header=1&range=A1:D500&tq=';
const smp_main_query="select A,D where A is not NULL order by A"
const smp_main_queryurl=smp_main_url+encodeURIComponent(smp_main_query);

const rec_main_url= 'https://docs.google.com/spreadsheets/d/1_WuRPqGhuuj7lGJn286_oU35kgUaMZ-fwpEzKART9L8/gviz/tq?gid=1663949858&header=1&range=A1:P500&tq=';
const rec_main_query="select A,C where B='total' order by A";
const rec_main_queryurl=rec_main_url+encodeURIComponent(rec_main_query);

function smp_main_chart(){
  let query = new google.visualization.Query(smp_main_queryurl);
  query.send(smp_main_chartboard);
}

function smp_main_chartboard(res){
  let data = res.getDataTable();
  let time_slider = new google.visualization.ControlWrapper({
    'controlType': 'DateRangeFilter',
    'containerId': 'smp_main_filter',
    'options': {
        'filterColumnLabel': 'date',
        'hAxis': {format: 'yy/MM'},
        'vAxis': {format: 'long'},
        'chartArea':{width: '50%'},
        'ui':{
          'label':'기간',
          'labelSeparator':':',
          'showRangeValues':false,
        }
    }
  });

  let chart  = new google.visualization.ChartWrapper({
    'chartType': 'LineChart',
    'containerId': 'smp_main_chart',
    'options': {
      'title':'월간 가중평균 계통한계가격 그래프',
      'legend':'none'
    }
  });
  let dashboard = new google.visualization.Dashboard(document.getElementById('smp_main_dashboard'));
  dashboard.bind(time_slider,chart);
  dashboard.draw(data);

  smp_main_1yrs= function() {
    time_slider.setState({'lowValue': new Date(2017,1,1), 'highValue': new Date(2017,12,1)});
    time_slider.draw();
  };
  smp_main_3yrs= function(){
    time_slider.setState({'lowValue': new Date(2015,1,1), 'highValue': new Date(2017,12,1)});
    time_slider.draw();
  };
  smp_main_all= function(){
    time_slider.setState({'lowValue': new Date(2001,4,1), 'highValue': new Date(2017,12,1)});
    time_slider.draw();
  };
}

function rec_main_chart(){
  let query = new google.visualization.Query(rec_main_queryurl);
  query.send(rec_main_chartboard);
}

function rec_main_chartboard(res){
  let data = res.getDataTable();
  let time_slider = new google.visualization.ControlWrapper({
    'controlType': 'DateRangeFilter',
    'containerId': 'rec_main_filter',
    'options': {
        'filterColumnLabel': 'date',
        'ui':{
          'label':'기간',
          'showRangeValues':false
        }
    },
  });

  let chart  = new google.visualization.ChartWrapper({
    'chartType': 'LineChart',
    'containerId': 'rec_main_chart',
    'options':{
       'title':'REC 도매시장 가격 그래프',
       'legend':'none',
    }
  });
  let dashboard = new google.visualization.Dashboard(document.getElementById('rec_main_dashboard'));
  dashboard.bind(time_slider,chart);
  dashboard.draw(data);

  rec_main_after= function() {
    time_slider.setState({'lowValue': new Date(2017,3,28), 'highValue': new Date(2017,11,16)});
    time_slider.draw();
  };
  rec_main_before= function(){
    time_slider.setState({'lowValue': new Date(2014,12,1), 'highValue': new Date(2013,3,26)});
    time_slider.draw();
  };
  rec_main_all= function(){
    time_slider.setState({'lowValue': new Date(2017,3,28), 'highValue': new Date(2017,11,16)});
    time_slider.draw();
  };
}

$(window).resize(function(){
  smp_main_chart();
  rec_main_chart();
});
