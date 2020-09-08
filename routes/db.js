const express = require('express');
const router = require('express').Router();
const scripts = require('../SQL/helpers/sqlLoader')
const {pool} = require('../config');

router.get('/', (req, res) => {
    res.status(200).json(scripts)
})

router.get("/:query", (req, res) => {
    const query = scripts[req.params.query];

    pool.query(query, [], error =>{
        if (error) throw error;
        res.status(201).json({status: 'success', message: `SQL File: ${req.params.query} successfully run.`})
    })
})

module.exports = router;
