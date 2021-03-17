create table story
(
    id serial not null,
    body text,
    "order" int default 0,
    archived bool default false
);

create unique index story_id_uindex
    on story (id);

alter table story
    add constraint story_pk
        primary key (id);

