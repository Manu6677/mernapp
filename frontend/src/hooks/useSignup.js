import { useState } from "react";
import { useAuthContext } from "./useAuthContext"; // it return user property and dispatch fn
// import { BASE_URL } from "../utilities/helper";
export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(null); // to show this loading while req in the way to go and come with response
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setLoading(true);
    setError(null);
    const response = await fetch("api/user/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // Save user to local storage
      //sessionStorage.setItem("user", JSON.stringify(json));
      localStorage.setItem("user", JSON.stringify(json));

      // update the authContext
      dispatch({ type: "LOGIN", payload: json });
      setLoading(false);
      setError(false);
    }
  };

  return { signup, isLoading, error };
};
