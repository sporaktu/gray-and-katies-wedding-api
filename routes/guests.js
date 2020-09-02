const express = require('express');
const router = require('express').Router();
const {pool} = require('../config');


router.get('/', (req, res) => {
    pool.query('select * from guests', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
})

router.post('/', (req, res) => {
    const {firstName, lastName} = req.body;
    console.log(req.body)

    pool.query(
        'insert into guests (firstName, lastName) values ($1, $2)',
        [firstName, lastName],
        error => {
            if (error) {
                throw error;
            }
            res.status(201).json({status: 'success', message: 'Guest Added'});
        }
    )
})

module.exports = router;
