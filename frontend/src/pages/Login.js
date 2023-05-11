import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label>Email: </label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)} // es input ki value change hogi toh fr email state ki b kro tbhi on change m set kia hai
        value={email} // 2 way data binding (agr frontend s value change hue h toh yaha reflect ho)
      />

      <label>Password: </label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)} // es input ki value change hogi toh fr email state ki b kro tbhi on change m set kia hai
        value={password} // 2 way data binding (agr frontend s value change hue h toh yaha reflect ho)
      />

      <button disabled={isLoading}>Login</button>
      <div>{error && <div className="error"> {error}</div>}</div>
    </form>
  );
};

export default Login;

/**
  TO look inside the local storage when we load the page to see that we have user's property
   -If we have the user in local storage we update the auth context state to reflect that
   - SO react see us as logedIn
 */
