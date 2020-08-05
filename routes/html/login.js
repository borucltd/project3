const express = require('express');
const router = require("express").Router();


router
    .route("/")
    .all(function(req, res) {

        res.redirect("/login")

    })

module.exports = router;