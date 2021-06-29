const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Number,
    required: "Enter the day number value"
  },
 /* exercises:[
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise"
    }
  ],*/
  exercises : { type : Array , "default" : [] },
  date: {
    type: Date,
    default: Date.now,
  }
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
