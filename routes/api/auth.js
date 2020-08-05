const bcrypt = require('bcryptjs');
const express = require('express');
const router = require("express").Router();
const passport = require('passport');
const User = require("../../models/user")

// bcrypt setup
const saltRounds = 10;

router
    .route('/login')
    .post(function(req, res, next) {       

        passport.authenticate("local",  function(err, user, info) {

            // if user doesn't exists reply redirect to login
            if (!user) {

                console.log("User doesn't exist.")
                return res.status(500).json({error: `No such user`}); 

            // if user exists
            } else {          
                // establish login session
                req.logIn(user, function(err) {
                    if (err) {
                        return res.status(400).json({errors: err});
                    } 

                    return res.status(200).json({
                        status: "logged_in",
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        })            
                })
            }
        })(req,res,next);
    })
        
    router
    .route('/register')
    .post(function(req, res, next) {         

        passport.authenticate("local", (err, user, info) => {

            console.log(info)
          
            // we are in register route, if user doesn't exists we need to create one
            if (!user) {
                console.log('REGISTER: encrypt password and create user');
                // encrypt password
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        // create user
                        User.create({
                            name: req.body.name,
                            email: req.body.email,
                            password:  hash
                        })
                        .then(data => {
                            console.log(`User {req.body.email} created`);
                            res.status(201).json({
                                status: "created",
                                user: {
                                    name: req.body.name,
                                    email: req.body.email
                                }
                            
                            });
                        })
                        .catch(err => {
                            res.status(304).json({warning: `Database error.`});
                        })                
                    });
                });
                
            }

            // if user exists, we reply with 304
            if (user) {
                return res.status(304).json({warning: `User already exists ${req.body.email}`});
            } 

             // if user == false, and message wrong_password, we reply with 304
             if (info) {
                 if (info.message === 'wrong_password') {
                    return res.status(304).json({warning: `User already exists ${req.body.email}`});
                 }
             }

        })(req,res,next);
        }
    )

    router
    .route('/logged_in')
    .get(function(req, res) { 

        // check user
        if (req.user) {

            res.send({user : req.user})

        } else {
            console.log("There is no user, redirecting to: /login")
            res.redirect("/login");
        }
     })

     router
    .route('/logout')
    .delete(function(req, res, next) { 
        // express function
        req.logOut()
        res.redirect(301,"/")
     })

module.exports = router;