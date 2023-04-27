import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <header>
      <div className="conatiner">
        <Link to="/">
          <h1 className="title">Workout Buddy...</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
