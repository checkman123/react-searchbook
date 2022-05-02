import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div className="navbar__container">
        <Link to="/" className="navbar__link">
          Home
        </Link>
        <Link to="/wishlist" className="navbar__link">
          Wishlist
        </Link>
      </div>
    </>
  );
}
