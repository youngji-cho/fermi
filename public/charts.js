google.charts.load('current', {'packages':['corechart', 'controls']});
google.charts.setOnLoadCallback(smp_chart);
google.charts.setOnLoadCallback(rec_chart);

const smp_url= 'https://docs.google.com/spreadsheets/d/1_WuRPqGhuuj7lGJn286_oU35kgUaMZ-fwpEzKART9L8/gviz/tq?sheet=SMP&header=1&range=A1:B201&tq=';

const rec_url= 'https://docs.google.com/spreadsheets/d/1_WuRPqGhuuj7lGJn286_oU35kgUaMZ-fwpEzKART9L8/gviz/tq?sheet=REC&header=1&range=A1:B64&tq=';

function smp_chart(){
  let query = new google.visualization.Query(smp_url);
  query.send(smp_chartboard);
}

function smp_chartboard(res){
  let data = res.getDataTable();
  let time_slider = new google.visualization.ControlWrapper({
    'controlType': 'DateRangeFilter',
    'containerId': 'smp_filter_div',
    'options': {
        'filterColumnLabel': 'date',
        'hAxis': {format: 'yy/MM'},
        'vAxis': {format: 'long'}
    }
  });

  let chart  = new google.visualization.ChartWrapper({
    'chartType': 'LineChart',
    'containerId': 'smp_chart_div',
    'options': {
      'title':'월간 가중평균 계통한계가격 그래프',
      'legend':{
        'position':'right'
      },
      'ui':{
        'label':''
      }
    }
  });
  let dashboard = new google.visualization.Dashboard(document.getElementById('smp_dashboard_div'));
  dashboard.bind(time_slider,chart);
  dashboard.draw(data);

  smp_1yrs= function() {
    time_slider.setState({'lowValue': new Date(2016,12,1), 'highValue': new Date(2017,11,1)});
    time_slider.draw();
  };
  smp_3yrs= function(){
    time_slider.setState({'lowValue': new Date(2014,12,1), 'highValue': new Date(2017,11,1)});
    time_slider.draw();
  };
  smp_all= function(){
    time_slider.setState({'lowValue': new Date(2001,4,1), 'highValue': new Date(2017,11,1)});
    time_slider.draw();
  };
}

function rec_chart(){
  let query = new google.visualization.Query(rec_url);
  query.send(rec_chartboard);
}

function rec_chartboard(res){
  let data = res.getDataTable();
  let time_slider = new google.visualization.ControlWrapper({
    'controlType': 'DateRangeFilter',
    'containerId': 'rec_filter_div',
    'options': {
        'filterColumnLabel': 'date'
    },
  });

  let chart  = new google.visualization.ChartWrapper({
    'chartType': 'LineChart',
    'containerId': 'rec_chart_div',
    'options':{
       'title':'REC 도매시장 가격 그래프',
       'legend':{
         'position':'right'
       },
       'ui':{
         'label':''
       }
    }
  });
  let dashboard = new google.visualization.Dashboard(document.getElementById('rec_dashboard_div'));
  dashboard.bind(time_slider,chart);
  dashboard.draw(data);

  rec_after= function() {
    time_slider.setState({'lowValue': new Date(2017,3,28), 'highValue': new Date(2017,11,16)});
    time_slider.draw();
  };
  rec_before= function(){
    time_slider.setState({'lowValue': new Date(2014,12,1), 'highValue': new Date(2013,3,26)});
    time_slider.draw();
  };
  rec_all= function(){
    time_slider.setState({'lowValue': new Date(2017,3,28), 'highValue': new Date(2017,11,16)});
    time_slider.draw();
  };
}

$(window).resize(function(){
  smp_chart();
  rec_chart();
});
