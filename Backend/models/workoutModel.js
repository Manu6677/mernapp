const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
/**
 Schema defines the structure of a document in database
  but MODEL does is apply that Schema to a particular Model AND
   then we use the model to iteract with a collection of that name
 */
// mongoose.model(created new model) and in string given model Name(as first arguement) and passed the schema as a second arguement
//  Now this above schema to be known as Workout Model
module.exports = mongoose.model("Workout", workoutSchema);

/** IMPORTANT
 It is the mongoose who allow us to create the schema b/c mongodb alone is schemaless 
  hence mongoose pkg is imported and Schema method applied on it
   and created a new instance of schema then created the schema structure
     and REMEMBER the timestamps (second arguement) stay outside of {} braces



 */
