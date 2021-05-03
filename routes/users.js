const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
const User = require('../models/user.js')
const { checkNotAuthenticated } = require('../authentication/notauthenticated');


router.get('/login', checkNotAuthenticated, (request, response) => {
    response.render('login', { success: request.flash('success') });
});


router.post('/login', (request, response, next) => {
    passport.authenticate('local', {
        successRedirect: '/profile/profile',
        failureRedirect: '/users/login',
        failureFlash: true
    })(request, response, next);
});


router.get('/signup', (request, response) => {
    response.render('signup');
});


router.post('/signup', (request, response) => {
    const { username, email, password, confirm_password } = request.body;
    let errors = [];

    if (password !== confirm_password) {
        errors.push({message: 'Passwords do not match.'});
    }

    if (password.length < 3) {
        errors.push({message: 'Password requires 3 or more characters.'});
    }

    if (errors.length > 0) {
        response.render('signup', {
            errors: errors,
            username: username,
            email: email,
            confirm_password: confirm_password 
        })
    } else {
        User.findOne({ email: email }).exec((err, user) => {
            if (user) {
                errors.push({message: 'Email already exists.'});
                render(response, errors, username, email, password, confirm_password);
            } else {
                const newUser = new User({
                    username: username,
                    email: email,
                    password: password
                });
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                        .then((value) => {
                            request.flash('success', 'You have successfully signed up.');
                            response.redirect('/users/login');
                    })
                    .catch(value => console.error(value));
                }));
            }
        })
    }
});


router.get('/logout', (request, response) => {
    request.logout();
    request.flash('success', 'You have successfully logged out.');
    response.redirect('/');
})


module.exports = router;
