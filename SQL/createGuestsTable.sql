create table if not exists guests
(
    id            serial primary key,
    lastName      varchar(30) not null,
    firstName     varchar(30) not null,
    attending     bool        not null,
    plusOne       bool        not null,
    isPlusOne     bool        not null,
    plusOneId     integer,
    email         varchar(256),
    phone         varchar(12),
    songRequest   varchar(512),
    date_created  timestamp,
    date_modified timestamp,
    archived      boolean default false
);