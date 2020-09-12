create or replace function new_guest(lastnamevalue character varying,
                                     firstnamevalue character varying,
                                     attendingvalue bool,
                                     plusonevalue bool,
                                     plusonefirstnamevalue character varying,
                                     plusonelastnamevalue character varying,
                                     emailvalue character varying,
                                     phonevalue character varying,
                                     songrequestvalue character varying)
    returns integer as
$BODY$
DECLARE
    plusone_id integer;
BEGIN
    if plusonevalue = true then
        insert into guests (lastname, firstname, attending, plusone, isplusone, date_created, date_modified)
        values (plusonelastnamevalue, plusonefirstnamevalue, true, false, true, current_timestamp, current_timestamp)
        returning id into plusone_id;

        insert into guests (lastname, firstname, attending, plusone, isplusone, plusoneid, email, phone,
                            songrequest, date_created, date_modified)
        values (lastnamevalue, firstnamevalue, attendingvalue, plusonevalue, false, plusone_id, emailvalue, phonevalue,
                songrequestvalue, current_timestamp, current_timestamp);

        return plusone_id;
    end if;
    if plusonevalue = false then
        insert into guests (lastname, firstname, attending, plusone, isplusone, plusoneid, email, phone,
                            songrequest, date_created, date_modified)
        values (lastnamevalue, firstnamevalue, attendingvalue, plusonevalue, false, null, emailvalue, phonevalue,
                songrequestvalue, current_timestamp, current_timestamp);

        return null;
    end if;
    END;
$BODY$
    LANGUAGE plpgsql volatile;
