create database energy;
use energy;

create table `rec_price`(
	`date` date not null,
    `land_or_jeju` enum('land','jeju','total'),
    `average_price` mediumint,
    `lowest_price` mediumint,
    `success_amount` mediumint,
    `sucess_deals` mediumint,
    `transaction_money` mediumint,
    `sell_amount` mediumint,
    `sell_deals` mediumint,
    `buy_amount` mediumint,
    `buy_deals` mediumint,
    `solar_non_solar` enum('태양광','비태양광','통합'),
    primary key(`date`)
)DEFAULT CHARSET=utf8;

create table `smp_price`(
	`date` date not null,
    `land_price`mediumint,
    `jeju_price` mediumint,
    `total_price` mediumint,
    primary key(`date`)
)DEFAULT CHARSET=utf8;


load data local infile '/Users/youngji/github/data/smp.csv' into table energy.smp_price charset 'utf8' fields terminated by ',' lines terminated by '/n' ignore 1 rows;
show warnings;
select *from energy.smp_price;
