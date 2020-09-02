create table guests (
id serial primary key,
firstName varchar(30) not null,
lastName varchar(30) not null
);

insert into guests (firstName, lastName)
values ('Kevin', 'Lacey');
