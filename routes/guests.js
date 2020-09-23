const express = require('express');
const router = require('express').Router();
const {getAllGuests, createGuest} = require('../modules/guests');
const checkJwt = require('../middleware/checkJwt');
const jwtAuthz = require('express-jwt-authz');

const scope = jwtAuthz(['manage'])

router.get('/', checkJwt, getAllGuests);

router.post('/', createGuest)

module.exports = router;
