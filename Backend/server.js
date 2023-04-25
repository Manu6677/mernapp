require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workout");

// express app
const app = express();

// middlware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// connect to Mongo
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// routes
app.use("/api/workouts", workoutRoutes);

/**
 IMP
 when you push code on github, This env file remain in the gitignore file it wont be pushed
  To access the env file in another file, for it downld the dotenv package 
   So, dotenv is a package that load env variables into the process.env object available to us globally in nodejs env
     now use that (dotenv pckg) require the method at top and directly invoke config method on it after require
       This is the method which attach the env varibales to process Object globally
        Process object avilable to us in node app
 */
