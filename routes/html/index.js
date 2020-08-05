const router = require("express").Router();
const loginRoutes = require("./login");
//const dbRoutes = require("./db");


// auth routes
router.use("/", loginRoutes);


module.exports = router;
