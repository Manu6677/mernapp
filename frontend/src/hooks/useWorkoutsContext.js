import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext); // passed workoutsContext object in this hook, return us value of workoutContext (value which provide in contextprovider) and also its object with the state and dispatch function

  if (!context) {
    throw Error(
      "useWorkoutsConext must be used inside an workoutsContextProvider"
    );
  }
  return context;
};
