const {pool} = require('../config');

function getAllGuests(req, res) {
    pool.query('select * from guests', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

function createGuest({req, res}) {
    const {firstName, lastName} = req.body;
    console.log(req.body)

    pool.query(
        `insert into guests (
                firstName,
                lastName
            ) 
            values (
                $1,
                $2
            )`,
        [firstName, lastName],
        error => {
            if (error) {
                throw error;
            }
            res.status(201).json({status: 'success', message: 'Guest Added'});
        }
    )
}

module.exports = {
    getAllGuests,
    createGuest
}
