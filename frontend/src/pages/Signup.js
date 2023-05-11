import React, { useState } from "react";

import { useSignup } from "../hooks/useSignup";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
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

      <button disabled={isLoading}>Sign Up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

// After clicking on the Signup button you need to send post request to backend/server to handle req
//  -All the logic for it in the useSignup hook
export default Signup;
