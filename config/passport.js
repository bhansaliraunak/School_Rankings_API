const monngojs = require('mongojs');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Users = mongoose.model('Users');
const Schools = mongoose.model('Schools');

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
}, (email, password, done) => {
    Users.findOne({email}).then((user) => {
        if(!user || !user.validatePassword(password)) {
            return done(null, false, {error: { 'email or password': 'is invalid'}});
        }
        return done(null, user);
    }).catch(done);
}));
