const express = require('express')
const router = express.Router()


router.get('/', (request, response) => {
    response.render('index');
});


router.get('/profile', (request, response) => {
    response.render('profile');
});


router.get('/signup', (request, response) => {
    response.render('signup');
});


router.get('/login', (request, response) => {
    response.render('login');
});


module.exports = router;
