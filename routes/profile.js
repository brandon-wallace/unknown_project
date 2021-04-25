const express = require('express')
const router = express.Router()


router.get('/profile', (request, response) => {
    response.render('profile');
});


router.get('/recipe', (request, response) => {
    response.render('recipe');
});


router.get('/settings', (request, response) => {
    response.render('settings');
});


module.exports = router;
