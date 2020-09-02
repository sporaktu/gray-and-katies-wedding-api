create type attending as enum('yes', 'no', 'maybe');

drop table if exists guests;

CREATE TABLE guests (
ID SERIAL PRIMARY KEY,
lastName VARCHAR(30) NOT NULL,
firstName VARCHAR(30) NOT NULL,
);
