var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/.well-known/acme-challenge/lcKloZ061Zpg9vLA0BuK6ERQvCyZHXJawlz6JYCQNtY', (req, res) => {
  res.send('lcKloZ061Zpg9vLA0BuK6ERQvCyZHXJawlz6JYCQNtY.sqRiGlYzKX-lkad7BbUvSBIj-39VGNACkgBFUekxzkU');
})

module.exports = router;
