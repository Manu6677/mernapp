import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext(); // 1) create a context by invoking it

// 2) Next thing to provide the contextProvider to our application tree so that our all components can be accessable
// 3) In WorkoutsContextProvider children is <app> whole app which is wraped by provider of context that means for whole app WorkoutsContext  is available to access

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};

// we created custom workoutcontext compo which return the actual provider of context that we created (this provider wrap the compo whatever its context represent)
// INSIDE useReducer: 1st arg is Reducer fn name and 2nd arg is INITIAL state which is object and null
// after it we update the state object of useReducer
// by the dispatch fn inside, 1st) pass type property with string and (2nd) property is payload which reps any data we need to make this change
// action object that we passed into dispatch fn and that object had a type propert and payload
