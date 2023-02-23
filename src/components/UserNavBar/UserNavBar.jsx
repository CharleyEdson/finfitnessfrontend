import React from "react";
import { useState } from "react";

import { useContext } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./UserNavBar.css";

const UserNavBar = () => {
  const [isOpen, setOpen] = useState(false);
  const { logoutUser, user } = useContext(AuthContext);

  return (
    <nav className={`navbar ${isOpen ? "open" : ""}`}>
      <div
        className="hamburger-icon-container"
        onClick={() => setOpen(!isOpen)}
      >
        <div className="navbarcontent">
          <div className="movehamicon">
            <i className={`fa fa-bars ${isOpen ? "open" : ""}`} />
            <span className="hamburger-text">
              <Link
                to="/home"
                style={{ textDecoration: "none", color: "white" }}
              >
                <b className="name">FinFitness</b>
              </Link>
            </span>
          </div>
        </div>
      </div>
      <div>
        <button className="navbutton" onClick={logoutUser}>
          Logout
        </button>
      </div>
      {isOpen && (
        <ul className="nav-menu">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/edit">Edit</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default UserNavBar;
