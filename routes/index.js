const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../authentication/authentication')


router.get('/', (request, response) => {
    response.render('index');
});


router.get('/login', (request, response) => {
    response.render('login');
});


router.get('/signup', (request, response) => {
    response.render('signup');
});


module.exports = router;
