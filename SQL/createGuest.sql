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
        insert into guests (lastname, firstname, attending, plusone, isplusone)
        values (plusonelastnamevalue, plusonefirstnamevalue, true, false, true)
        returning id into plusone_id;

        insert into guests (lastname, firstname, attending, plusone, isplusone, plusoneid, email, phone,
                            songrequest)
        values (lastnamevalue, firstnamevalue, attendingvalue, plusonevalue, false, plusone_id, emailvalue, phonevalue,
                songrequestvalue);

        return plusone_id;
    end if;
    if plusonevalue = false then
        insert into guests (lastname, firstname, attending, plusone, isplusone, plusoneid, email, phone,
                            songrequest)
        values (lastnamevalue, firstnamevalue, attendingvalue, plusonevalue, false, null, emailvalue, phonevalue,
                songrequestvalue);

        return null;
    end if;
    END;
$BODY$
    LANGUAGE plpgsql volatile;

select new_guest(
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8,
    $9
    );

select new_guest(
               'Kevin',
               'Lacey',
               true,
               true,
               'bobby',
               'mitchel',
               'kevin@mail.com',
               '123-456-7890',
               'sweet child of mine'
           );