const router = require("express").Router();
const dbController = require("../../controllers/dbController");

// ==== using passport built-in function to make sure request is authenticated
// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login');
// }

// router.get('/landing', ensureAuthenticated, function(req, res) {
//   res.render('landing', { user: req.user });
// });

// adding activity
router
  .route("/addactivity")
  .post((req,res) => {console.log("DB request"); dbController.createActivity(req.body,res)})

router
  .route("/getactivities:id")
  .get((req,res) => {console.log("DB request");console.log(req.params.id); dbController.findAll(req.params.id,res)})



module.exports = router;
