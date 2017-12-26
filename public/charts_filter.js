let smp_filter=document.getElementById("smp_filter_div");
let rec_filter=document.getElementById("rec_filter_div");

smp_filter.innerHTML="<select onChange='sendAndDraw(this.value)'> <option value=''>최근 3개월</option><option value='&tq=limit 3'>최근 1년</option><option value='&tq=select G,H'>최근 3년 </option><option value='&tq=select G,H'>전체</option></select>";

rec_filter.innerHTML="<select onChange='sendAndDraw(this.value)'> <option value=''>통합시장이후</option><option value='&tq=limit 3'>통합시장이전</option><option value='&tq=select G,H'>전체</option></select>";
