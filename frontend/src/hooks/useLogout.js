import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchWorkout } = useWorkoutsContext();

  const logout = () => {
    // remove user from storage & session
    localStorage.removeItem("user");
    // sessionStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    dispatchWorkout({ type: "SET_WORKOUTS", payload: null });
  };
  return { logout };
};

/**
  -To LOGOUT we do not need to send req to backend
   -We just need to change Global state by dispatching an action
    -and To remove the JSON web token in Local storage
 */
