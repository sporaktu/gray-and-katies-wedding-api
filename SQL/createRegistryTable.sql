create table if not exists registry
(
    id                          serial primary key,
    name                        varchar(64),
    url                         varchar(2083),
    store                       varchar(64),
    picture_url                 varchar(2083),
    price                       varchar(10),
    purchased                   boolean default false,
    purchaser_first_name        varchar(64),
    purchaser_last_name         varchar(64),
    archived                    boolean default false,
    date_created                timestamp,
    date_modified               timestamp
)