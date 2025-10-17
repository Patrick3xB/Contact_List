import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link to="/" className="navbar-brand">
        📒 Contact Manager
      </Link>
    </nav>
  );
};

export default Navbar;
