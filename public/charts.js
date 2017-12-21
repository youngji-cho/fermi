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
  });
  let dashboard = new google.visualization.Dashboard(document.getElementById('smp_dashboard_div'));
  dashboard.bind(time_slider,chart);
  dashboard.draw(data)
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
    }
  });

  let chart  = new google.visualization.ChartWrapper({
    'chartType': 'LineChart',
    'containerId': 'rec_chart_div',
  });
  let dashboard = new google.visualization.Dashboard(document.getElementById('rec_dashboard_div'));
  dashboard.bind(time_slider,chart);
  dashboard.draw(data)
}

$(window).resize(function(){
  smp_chart();
  rec_chart();
});
