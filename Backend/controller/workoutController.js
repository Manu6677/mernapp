const Workout = require("../models/workoutModel"); // it is IMP to put here this b/c it interact with Db
const { ObjectId } = require("mongodb");

// get all workouts
const getWorkouts = async (req, res) => {
  const allWorkout = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(allWorkout);
};

// get single workout
const getWorkout = async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const oneWorkout = await Workout.find({ _id: new ObjectId(req.params.id) });

    if (!oneWorkout) {
      return res.status(404).json({ error: "No such error" });
    }
    res.status(200).json(oneWorkout);
  } else {
    res.status(400).json({ error: "Your id is not valid" });
  }
};

// create new workout
const createWorkout = async (req, res) => {
  // here grab the req body to extract the (title, load, reps)

  const { title, reps, load } = req.body;
  // here created the new data which user passed and passed in workout Model then workout snd to client
  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const deleteWorkoutOne = await Workout.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    if (!deleteWorkoutOne) {
      return res.status(404).json({ error: "No such error" });
    }
    res.status(200).json(deleteWorkoutOne);
  } else {
    res.status(400).json({ error: "Your id is not valid" });
  }
};

// update a workout
const updateWorkout = async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const updateWorkoutOne = await Workout.updateOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        ...req.body,
      }
    );
    if (!updateWorkoutOne) {
      return res.status(400).json({ error: "No such error" });
    }
    res.status(200).json(updateWorkoutOne);
  } else {
    res.status(400).json({ error: "Your id is not valid" });
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
