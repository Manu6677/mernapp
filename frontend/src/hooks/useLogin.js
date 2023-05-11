import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useLogin = () => {
  const [isLoading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    const response = await fetch("api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // set value in local storage & session storage
      localStorage.setItem("user", JSON.stringify(json));

      // sessionStorage.setItem("user", JSON.stringify(json));

      // update global context

      dispatch({ type: "LOGIN", payload: json });
      setLoading(false);
      setError(false);
    }
  };
  return { login, isLoading, error };
};
