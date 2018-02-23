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
