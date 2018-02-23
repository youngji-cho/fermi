create database `energy` character set utf8  collate utf8_general_ci;
use energy;
create table `rec_price`(
    `date` date not null,
    `land_or_jeju` enum ('land','jeju','total'),
    `average_price` mediumint,
    `lowest_price` mediumint,
    `highest_price` mediumint,
    `success_deals` mediumint,
    `transaction_amount` int,
    `sell_amount` mediumint,
    `sell_deals` mediumint,
    `buy_amount` mediumint,
    `buy_deals` tinyint,
    `id` smallint auto_increment ,
    primary key(`id`)
);

load data local infile '/Users/youngji/github/data/rec1.csv'  into table energy.rec_price fields terminated by ',' LINES TERMINATED BY '\n' ignore 1 rows;
show warnings;
drop table `rec_price`;
truncate table `rec_price`;
select *from `rec_price`;
