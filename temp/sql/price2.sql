create database `energy_data1`;
use energy_data1;

create table `rec_price3`(
	`date` date not null,
    `land_or_jeju` enum('total','land','jeju'),
    `average_price` int,
    `lowest_price` int,
	`highest_price` int,
    `transaction_money` bigint,
    `sell_deals` mediumint,
    `sell_amount` int,
    `buy_deals` mediumint,
    `buy_amount` mediumint,
    `sucess_deals` mediumint,
    `success_amount` int,
    `solar_non_solar` enum('solar','non-solar','total'),
     `id` int auto_increment,
    primary key(`id`)
)DEFAULT CHARSET=utf8;

create table `rec_price2`(
	`date` date not null,
    `land_or_jeju` enum('total','land','jeju'),
    `average_price` int,
    `lowest_price` int,
    `highest_price` int,
    `transaction_money` bigint,
    `sell_deals` mediumint,
    `sell_amount` int,
    `buy_deals` mediumint,
    `buy_amount` mediumint,
    `sucess_deals` mediumint,
    `success_amount` int,
    `solar_non_solar` enum('solar','non-solar','total'),
     `id` int auto_increment,
    primary key(`id`)
)DEFAULT CHARSET=utf8;

create table `rec_price1`(
	`date` date not null,
    `land_or_jeju` enum('total','land','jeju'),
    `average_price` int,
    `lowest_price` int,
    `highest_price` int,
    `transaction_money` bigint,
    `sell_deals` mediumint,
    `sell_amount` int,
    `buy_deals` mediumint,
    `buy_amount` mediumint,
    `sucess_deals` mediumint,
    `success_amount` int,
    `solar_non_solar` enum('solar','non-solar','total'),
     `id` int auto_increment,
    primary key(`id`)
)DEFAULT CHARSET=utf8;

load data local infile '/Users/youngji/github/data/rec3.csv' into table rec_price3 fields terminated by ','   lines terminated by '\n' ignore 1 lines (
	`date` ,`land_or_jeju`,@average_price,@lowest_price,@highest_price ,@transaction_money,@sell_deals,
    @sell_amount,@buy_deals,@buy_amount,@sucess_deals,@success_amount ,`solar_non_solar`
) set `average_price`=nullif(@average_price,''),`lowest_price`=nullif(@lowest_price,''),`highest_price`=nullif(@highest_price,''),
`transaction_money`=nullif(@transaction_money,''),`sell_deals`=nullif(@sell_deals,''),`sell_amount`=nullif(@sell_amount,''),
`buy_deals`=nullif(@buy_amount,''),`buy_amount`=nullif(@buy_amount,''),
`sucess_deals`=nullif(@sucess_deals,''),`success_amount`=nullif(@success_amount,'');

select * from rec_price3 where land_or_jeju='total' and average_price !=0;

load data local infile '/Users/youngji/github/data/rec2.csv' into table rec_price2 fields terminated by ','   lines terminated by '\n' ignore 1 lines (
	`date` ,`land_or_jeju`,@average_price,@lowest_price,@highest_price ,@transaction_money,@sell_deals,
    @sell_amount,@buy_deals,@buy_amount,@sucess_deals,@success_amount ,`solar_non_solar`
) set `average_price`=nullif(@average_price,''),`lowest_price`=nullif(@lowest_price,''),`highest_price`=nullif(@highest_price,''),
`transaction_money`=nullif(@transaction_money,''),`sell_deals`=nullif(@sell_deals,''),`sell_amount`=nullif(@sell_amount,''),
`buy_deals`=nullif(@buy_amount,''),`buy_amount`=nullif(@buy_amount,''),
`sucess_deals`=nullif(@sucess_deals,''),`success_amount`=nullif(@success_amount,'');

select * from rec_price2;


create table `smp_price1`(
    `id` int auto_increment,
	`date` date not null,
    `land_price` float,
    `jeju_price` float,
    `total_price` float,
    primary key(`id`)
);

load data local infile '/Users/youngji/github/data/smp.csv' into table smp_price1 fields terminated by ','   lines terminated by '\n' ignore 1 lines (
	`date` ,@land,@jeju,@total
) set `land_price`=nullif(@land,''), `jeju_price`=nullif(@jeju,''),`total_price`=nullif(@total,'');

select * from smp_price1;
