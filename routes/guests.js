const express = require('express');
const router = require('express').Router();
const {pool} = require('../config');
const {getAllGuests} = require('../modules/guests');


router.get('/', getAllGuests);

router.post('/', (req, res) => {

})

module.exports = router;
