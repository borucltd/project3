const db = require("../models");
const { User, Google } = require("../models");

// Defining methods for activity controller
module.exports = {
  createActivity:   function(req, res) {
    console.log("Add to database: ",req)
   
    db.User.findById(req.userid)
      .then((user) =>{
        
        user.activities.push({
          "title": req.title,
          "category": req.category,
          "distance": req.distance,
          "time": req.time,
          "date": req.date,
          "file": req.file,
          "location": {"coordinates": [req.longitude, req.latitude]}
        })

        console.log("USER activities:")
        
        user.save()
          .then(dbModel => {
            // user was updated with new activity
            // we need to find its id
            db.User.findById(req.userid)
              .then(user => {    
                // because I add activies by pushing... the last one is 
                // always at the end od the array -> no need to sort :):)
                const lastActivityId = user.activities[user.activities.length-1]._id;
                res.status(201).json({"status": "created", "activity": lastActivityId })
               })
               .catch(err => res.status(422).json(err));
            })
          .catch(err => res.status(201).json(err));
      })
      .catch(err => res.status(422).json(err));
  },
  findAll  : function(req, res) {

    console.log("List activities from database for user: ",req)
   
    db.User.findById(req)
      .then(dbModel => {    
        
        res.status(200).json(dbModel.activities)
      })
      .catch(err => res.status(422).json(err));

  },
  findById: function(req, res) {
    db.Post.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createUser: function(req, res) {
    db.User.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Post.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Post.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  saveGoogleKek: function(req,res) {
    db.Google.findOne({})
  }
  
};
