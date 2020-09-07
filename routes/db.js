const express = require('express');
const router = require('express').Router();
const scripts = require('../SQL/helpers/sqlLoader')
scripts.forEach(script => {
    router.get('/' + script.name.replace('.sql', ''), ((req, res) => {
        res.status(200).json(script);
    }))
})
router.get('/', (req, res) => {
    res.status(200).json(scripts)
})

module.exports = router;
