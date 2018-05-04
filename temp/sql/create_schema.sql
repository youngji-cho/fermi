use energy_data;
create table `oil_price`(
	`date` date not null,
	`wti` float,
     `id` int auto_increment,
    primary key(`id`)
)DEFAULT CHARSET=utf8;

drop table  `elec_supply`;
create table `elec_supply`(
	`date` date not null,
	`facility_capa` int,
    `supply_capa` int, 
    `max_supply` int,
    `elec_supply` int,
    `supply` float,
    `measue_time` varchar(30),
     `id` int auto_increment,
    primary key(`id`)
)DEFAULT CHARSET=utf8;

truncate elec_supply;
create table `elec_supply`(
	`date` date not null,
	`facility_capa` int,
    `supply_capa` int, 
    `max_supply` int,
    `elec_supply_power` int,
    `elce_supply` float,
    `measue_time` varchar(30),
     `id` int auto_increment,
    primary key(`id`)
)DEFAULT CHARSET=utf8;

drop table `price_index`;
create table `price_index`(
	`date` date not null,
	`korea_producer` float,
    `us_producer` float,
    `id` int auto_increment,
    primary key(`id`)
 )DEFAULT CHARSET=utf8;
 
 create table `price_index`(
	`date` date not null,
	`korea_producer` float,
    `us_producer` float,
    `id` int auto_increment,
    primary key(`id`)
 )DEFAULT CHARSET=utf8;
 
 create table `elec_forecast`(
	`date` date not null,
	`WEO_CP` float,
    `WEO_NP` float,
    `WEO_450` float
 )DEFAULT CHARSET=utf8;
