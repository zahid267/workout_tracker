const router = require("express").Router();
const path = require('path');
var mongojs = require("mongojs");

const Workout = require("../models/workout.js");
const db = require("../models");



router.get("/api/workouts", (req, res) => {
 // console.log("here 123 - get");
  db.Workout.find({}).sort({ day: -1 }).limit(1)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});
router.get("/api/workouts/range", (req, res) => {
  //console.log("here 127 - get");
   db.Workout.find({}).sort({ day: -1 }).limit(7)   //// Sort by desc order by date/time and then select the first 7 records
   //db.Workout.stats()
     .then(dbWorkout => {
      // console.log("success")
       res.json(dbWorkout);
     })
     .catch(err => {
      // console.log(err);
       res.json(err);
     });
 });

 router.get("/api/workouts/range-Aggregate", (req, res) => {
  db.Workout.aggregate( [
      {
        $addFields: {
          totalDuration: { $sum: "$exercises{$duration}" }  /// not working
        }
      }
    ] ).sort({ day: -1 }).limit(7)
    //db.Workout.stats()
    .then(dbWorkout => {
       console.log(dbWorkout)
       res.json(dbWorkout);
     })
     .catch(err => {
      // console.log(err);
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
