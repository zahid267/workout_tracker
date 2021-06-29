const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
      type: {
        type: String,
        trim: true,
        required: "Enter a type for exercise"
      },
      name: {
        type: String,
        trim: true,
        required: "Enter a name for exercise"
      },
      duration: {
        type: Number,
        required: "Enter the duration value"
      },
      weight: {
        type: Number,
        required: "Enter the weight value"
      },
      reps: {
        type: Number,
        required: "Enter the reps value"
      },
      sets: {
        type: Number,
        required: "Enter the sets value"
      },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
