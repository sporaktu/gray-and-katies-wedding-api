create table if not exists photos
(
	id serial not null,
	url varchar(2048),
	"order" int
);

create unique index photos_id_uindex
	on photos (id);

alter table photos
	add constraint photos_pk
		primary key (id);

