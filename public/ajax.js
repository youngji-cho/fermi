const three_months =$('#3months')
const six_months =$('#6months')
const one_year=$('#1year')
const total=$('#total')

const width=1000,height=500;
const margin = {
  top: 20, right: 20, bottom: 30, left: 50
};
//SVG 후속 오브젝트 정의
const recSvg=d3.select("body")
  .append("svg")
  .attr("width",width)
  .attr("height",height);

const g = recSvg.append("g") //
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//구체적인 그래프에 대한 정의

const parseTime= d3.timeParse("%Y. %m. %d");
function recConverter(x){
  return {
    date:parseTime(x.date),
    land:parseInt(x.land),
    jeju:parseInt(x.jeju),
    total:parseInt(x.total)
  }
};
//이미지 골격에 한 정의
const width=1000,height=500;
const margin = {
  top: 20, right: 20, bottom: 30, left: 50
};
//SVG 후속 오브젝트 정의
const smpSvg=d3.select("body")
  .append("svg")
  .attr("width",width)
  .attr("height",height);
const g = smpSvg.append("g") //
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//구체적인 그래프에 대한 정의


const xScale = d3.scaleTime() //x-scale에 대한 정의
  .rangeRound([margin.left, width-margin.right]);
const yScale = d3.scaleLinear()//y-scale에 대한 정의
  .rangeRound([height-margin.bottom, margin.top]);
const line = d3.line()
  .x(function(d){return xScale(d.date);})
  .y(function(d){return yScale(d.total);});

function graph(time){
  let toDay = new Date();
  let startDay = new Date();
  let date =startDay.getDate();
  startDay.setDate(date-time);

  let startDate=`${startDay.getFullYear()}-${startDay.getMonth()}-${startDay.getDate()}`;
  let endDate= `${toDay.getFullYear()}-${toDay.getMonth()}-${toDay.getDate()}`;

  $.ajax({
    url:`http://www.fermi.me/rec_data/average_price/${startDate}/${endDate}/total`,
    type:'GET',
    dataType:'json',
    headers: {
      'Content-Type': 'text/html',
    },
    success(data){
      let parsedData=data.map(function(eachData){
        return smpConverter(eachData);
      });

      xScale.domain(d3.extent(parsedData, function(d) {
       return d.date; }));
      yScale.domain(d3.extent(parsedData, function(d) { return d.total; }));

      g.append("path")
          .datum(parsedData)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 1.5)
          .attr("d", line);

      g.append("g")
        .attr("transform", "translate(0," + (height-margin.top) + ")")
          .call(d3.axisBottom(xScale));

      g.append("g")
          .call(d3.axisLeft(yScale));

    },
    error(jqXHR,status,errorThrown){
      console.log(jqXHR);
    }
  });
}

$('#3months').click(()=>{
  graph(90);
});
$('#6months').click(()=>{
  graph(180);
});
$('#1year').click(()=>{
  graph(365);

});
$('#total').click(()=>{
  graph(100000);
});
