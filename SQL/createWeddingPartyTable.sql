create table wedding_party
(
    id serial primary key,
    firstname varchar(30),
    lastname varchar(30),
    role varchar(30),
    picture_url varchar(2083),
    story text,
    date_created timestamp,
    date_modified timestamp,
    archived boolean
);