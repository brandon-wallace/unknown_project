require('dotenv').config()
const path = require('path')
const express = require('express')
const session = require('express-session')
const router = express.Router()
const app = express()
const passport = require('passport')
const flash = require('connect-flash')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


require('./authentication/passport')(passport)

mongoose.connect('mongodb://127.0.0.1/testing', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to database!'))
.catch((err) => console.log(err));


app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '/public')));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())

app.use(flash());
app.use((request, response, next) => {
    response.locals.success = request.flash('success');
    response.locals.errors = request.flash('error');
    next();
});

app.use((request, response, next) => {
    response.locals.isAuthenticated = request.isAuthenticated();
    next();
});


app.use('/', require('./routes/index'));

app.use('/users', require('./routes/users'));


app.listen(3000);
