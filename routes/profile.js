const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe.js')


router.get('/profile', (request, response) => {
    response.render('profile');
});


router.get('/recipe', (request, response) => {
    response.render('recipe');
});


router.post('/recipe', (request, response) => {
    const { recipe_title, description, directions, ingredients, prep_time, cook_time, servings } = request.body;
    request.flash('success', 'A new recipe has been created.');
    response.redirect('/profile/recipe');
});


router.get('/settings', (request, response) => {
    response.render('settings');
});


module.exports = router;
