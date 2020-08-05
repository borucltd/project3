const bcrypt = require("bcryptjs"); // -> will do that later
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user")

// bcrypt setup
const saltRounds = 10;


// Setting up passport for authenication
passport.serializeUser((user,done) => {
    done(null, user.id);
})

passport.deserializeUser((id,done) => {
    User.findById(id, (err,user) => {
        done(err,user)
    });
})

// Setting up passport local strategy
passport.use(
    new LocalStrategy(
        { 
            usernameField: "email" 
        }, 
        function(email, password, done) {

            // check if user exists in database by checking its email
            
            
            User.findOne({ email: email })
                .then(user => {
                                       
                    if (!user) {
                        console.log(`Setup.js: ${email} ${password}` )
                        return done(null, false, { message: 'no_user' });
                    
                    } else {
                        console.log(`SETUP.JS: User ${email} exists`)  
                        
                        // check password(plain) against user.password(hash)
                        bcrypt.compare(password, user.password, function(err, res) {
                            if (res) {
                                console.log(`SETUP.JS: User ${email} password OK`) 
                                return done(null, user);
                            } else {
                                console.log(`SETUP.JS: User ${email} password NOT OK`) 
                                return done(null, false, { message: "wrong_password" });
                            }
                        });
                    }                         
                })
                .catch(err => {
                    return done(null, false, { message: err });
                });
        })
);

module.exports = passport;