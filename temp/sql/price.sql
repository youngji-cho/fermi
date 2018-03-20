create database energy;
use energy;

create table energy.`rec_price`(
    `id` int auto_increment,
	`date` date not null,
    `land_or_jeju` enum('total','land','jeju'),
    `average_price` int,
    `lowest_price` int,
    `highest_price` int,
    `success_amount` int,
    `sucess_deals` mediumint,
    `transaction_money` bigint,
    `sell_amount` int,
    `sell_deals` mediumint,
    `buy_amount` mediumint,
    `buy_deals` mediumint,
    `solar_non_solar` enum('solar','non-solar','total'),
    primary key(`id`)
)DEFAULT CHARSET=utf8;

create table energy.`smp_price`(
    `id` int auto_increment,
		`date` date not null,
    `land_price`mediumint,
    `jeju_price` mediumint,
    `total_price` mediumint,
    primary key(`id`)
);

load data local infile '/Users/youngji/github/data/smp.csv' into table energy.smp_price charset 'utf8' fields terminated by ',' lines terminated by '/n' ignore 1 rows;
show warnings;
select *from energy.smp_price;

DROP TABLE `energy`.`rec_price`;
create table energy.`rec_price`(
    `id` int auto_increment,
	`date` date not null,
    `land_or_jeju` enum('total','land','jeju'),
    `average_price` int,
    `lowest_price` int,
    `highest_price` int,
    `success_amount` int,
    `sucess_deals` mediumint,
    `transaction_money` bigint,
    `sell_amount` int,
    `sell_deals` mediumint,
    `buy_amount` mediumint,
    `buy_deals` mediumint,
    `solar_non_solar` enum('solar','non-solar','total'),
    primary key(`id`)
)DEFAULT CHARSET=utf8;

create table energy.`smp_price`(
	`date` date not null,
    `land_price`mediumint,
    `jeju_price` mediumint,
    `total_price` mediumint
);

load data local infile '/Users/youngji/github/data/smp.csv' into table energy.smp_price fields terminated by ','  enclosed by ' '  lines terminated by '\n' ignore 1 rows;

select *from energy.smp_price;
truncate energy.smp_price;


load data local infile '/Users/youngji/github/data/rec.csv' into table energy.rec_price fields terminated by ','   lines terminated by '\n' ignore 1 lines (
	`date` ,`land_or_jeju`,`average_price`,`lowest_price`,`highest_price` ,`success_amount` ,`sucess_deals`,
    `transaction_money`,`sell_amount`,`sell_deals`,`buy_amount`,`buy_deals`,`solar_non_solar`
);
show warnings;
select *from energy.rec_price;
truncate energy.rec_price;

load data local infile '/Users/youngji/github/data/test2.csv' into table energy.rec_price fields terminated by ','  lines terminated by '\n' ignore 1 lines (`date`,`land_or_jeju`,`average_price`,`lowest_price`,`success_amount`,`sucess_deals` ,`transaction_money`,`sell_amount`,`sell_deals` ,`buy_amount`,`buy_deals`,`solar_non_solar`);
select *from energy.rec_price;
show warnings;
