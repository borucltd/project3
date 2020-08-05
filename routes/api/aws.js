const router = require("express").Router();
const User = require("../../models/user");
const Aws = require("../../controllers/awsController");


router
  .route("/s3")
  .post((req,res) => {
      Aws.getS3uploadurl(req,res) 
  })

module.exports = router;
