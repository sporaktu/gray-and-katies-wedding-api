const express = require('express');
const router = require('express').Router();
const {
    getAllWeddingParty,
    handleWeddingPartyMemberPost,
    getWeddingPartyMember,
    handleDeletePartyMember
} = require('../modules/wedding-party');
const checkJwt = require('../middleware/checkJwt');
const jwtAuthz = require('express-jwt-authz');

const scope = jwtAuthz(['manage'])

router.get('/', getAllWeddingParty);
router.get('/:id', getWeddingPartyMember);

router.post('/', handleWeddingPartyMemberPost);

router.delete('/:id', handleDeletePartyMember)

module.exports = router;