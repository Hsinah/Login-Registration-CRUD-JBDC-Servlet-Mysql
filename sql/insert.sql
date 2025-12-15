create database crud_jdbc;

use crud_jdbc;


create table users(
	id int(3) NOT NULL AUTO_INCREMENT,
    username varchar(120) NOT NULL,
    name varchar(120) NOT NULL,
    password varchar(120) NOT NULL,
    email varchar(120) NOT NULL,
	DOB varchar (120) NOT NULL,
    country varchar(120) NOT NULL,
    primary key(id));
    
    
insert into users (username, name, password, email, DOB, country) values("hsinah","Hanish","Hanish@0505","hanishthiyagarajan5@gmail.com","05-05-2006","India");


select * from users;