const express = require("express");
// const Workout = require("../models/workoutModel");

const router = express.Router();
// above line created instance of router for us and we would attach a handler to this router variable
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controller/workoutController");

// GET all workout
router.get("/", getWorkouts);

// GET a single workout
router.get("/:id", getWorkout);

// POST a new workout
router.post("/", createWorkout);

// DELETE workout
router.delete("/:id", deleteWorkout);

// UPDATE a workout
router.patch("/:id", updateWorkout);
module.exports = router;
