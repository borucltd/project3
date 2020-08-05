const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

//Redirect "/" to Login and then to Front stupid idea...
//const htmlRoutes = require("./html");
//router.use("/", htmlRoutes);

// Go to API
router.use("/api", apiRoutes);
 
// Go to Frontend 
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
