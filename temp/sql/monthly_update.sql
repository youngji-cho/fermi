use energy_data;

truncate smp_price;
load data local infile '/Users/youngji/github/data/smp.csv' into table smp_price fields terminated by ','   lines terminated by '\n' ignore 1 lines (
	`date` ,@land,@jeju,@total
) set `land_price`=nullif(@land,''), `jeju_price`=nullif(@jeju,''),`total_price`=nullif(@total,'');

truncate oil_price;
load data local infile '/Users/youngji/github/data/oil_price.csv' into table oil_price fields terminated by ','   lines terminated by '\n' ignore 1 lines (
	`date` ,`wti`
); 

truncate elec_supply;
load data local infile '/Users/youngji/github/data/elec_supply.csv' into table elec_supply fields terminated by ','   lines terminated by '\n' ignore 1 lines (
	`date` ,`facility_capa`,`supply_capa`,`max_supply`,`elec_supply`,`supply`,`measue_time`
); 

truncate price_index;
load data local infile '/Users/youngji/github/data/price_index.csv' into table price_index fields terminated by ','   lines terminated by '\n' ignore 1 lines (
	`date` ,`korea_producer`,`us_producer`
); 

truncate rec_price;
load data local infile '/Users/youngji/github/data/rec3.csv' into table rec_price fields terminated by ','   lines terminated by '\n' ignore 1 lines (
	`date` ,`land_or_jeju`,@average_price,@lowest_price,@highest_price ,@transaction_money,@sell_deals,
    @sell_amount,@buy_deals,@buy_amount,@success_deals,@success_amount ,`solar_non_solar`
) set `average_price`=nullif(@average_price,''),`lowest_price`=nullif(@lowest_price,''),`highest_price`=nullif(@highest_price,''),
`transaction_money`=nullif(@transaction_money,''),`sell_deals`=nullif(@sell_deals,''),`sell_amount`=nullif(@sell_amount,''),
`buy_deals`=nullif(@buy_amount,''),`buy_amount`=nullif(@buy_amount,''),
`success_deals`=nullif(@sucess_deals,''),`success_amount`=nullif(@success_amount,'');


select smp_price.date, smp_price.total_price as smp_price, oil_price.wti,elec_supply.supply,price_index.korea_producer, price_index.us_producer from smp_price
    inner join oil_price
		on smp_price.date=oil_price.date
	inner join elec_supply
		on smp_price.date=elec_supply.date
	inner join price_index
		on smp_price.date=price_index.date

