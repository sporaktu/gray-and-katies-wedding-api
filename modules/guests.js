const fs = require('fs');
const SQL_DIRECTORY = './sql/';
const CREATE_GUEST_SQL_FILE_NAME = 'createGuest.sql';
let poolError = null;
const {pool} = require('../config');

function getAllGuests(req, res) {
    pool.query('select * from guests', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

module.exports = {
    getAllGuests,
    createGuest
}

function createGuest(req, res) {
    const {
        firstName,
        lastName,
        attending,
        plusOne,
        email,
        phone,
        songRequest,
        plusOneFirstName,
        plusOneLastName
    } = req.body;

    pool.query('select new_guest($1,$2,$3,$4,$5,$6,$7,$8,$9);',
        [
            lastName,
            firstName,
            attending,
            plusOne,
            plusOneFirstName,
            plusOneLastName,
            email,
            phone,
            songRequest
        ],
        error => {
            if (error) {
                throw error;
            }
            poolError = error;
        }
)
    let message = poolError ? poolError.toString() : 'success';
    res.end(message);
}
