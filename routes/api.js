const router = require("express").Router();
const path = require('path');
var mongojs = require("mongojs");

const Workout = require("../models/workout.js");
const db = require("../models");



router.get("/api/workouts", (req, res) => {
 // console.log("here 123 - get");
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});
router.get("/api/workouts/range", (req, res) => {
  console.log("here 127 - get");
   db.Workout.find({})
   //db.Workout.stats()
     .then(dbWorkout => {
       res.json(dbWorkout);
     })
     .catch(err => {
       res.json(err);
     });
 });

router.post("/api/workouts", async(req, res) => {
  //console.log("here 124 - post");
 
  db.Workout.collection.insertOne({day: new Date(new Date().setDate(new Date().getDate()))})
    .then(dbWorkout => {
      dbWorkout._id = dbWorkout.insertedId;
      res.json(dbWorkout);
      console.log("new record - res : " + dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  //console.log("here 125 updating - id : " +req.params.id );
  
  db.Workout.updateOne({"_id":  mongojs.ObjectId(req.params.id)}, {$push: {exercises: req.body}})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });

});

module.exports = router;
