create table if not exists guests (
id serial primary key,
lastName varchar(30) not null,
firstName varchar(30) not null,
attending bool not null,
plusOne bool not null,
plusOneId serial,
email varchar(256),
songRequest varchar(512)
);
