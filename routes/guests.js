const express = require('express');
const router = require('express').Router();
const {getAllGuests, createGuest} = require('../modules/guests');


router.get('/', getAllGuests);

router.post('/', createGuest)

module.exports = router;
