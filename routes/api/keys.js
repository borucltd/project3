const router = require("express").Router();
const User = require("../../models/user");

// get key
router
  .route("/google:id")
  .get((req,res) => {
    if (!req.user.email) {
      res.status(400).json({key: "unknown"})
    } else {
      console.log("Google key request");
      console.log(req.params.id); 
      console.log("Key",process.env.GOOGLE_KEY);
      res.status(200).json({key: process.env.GOOGLE_KEY})
    }
    
  })

module.exports = router;
