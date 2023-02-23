import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <div>
          <li className="brand">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <b className="name">FinFitness</b>
            </Link>
          </li>
        </div>
        <div className="signbuttons">
          <li >
            <button onClick={() => navigate("/register")}>Sign Up</button>
          </li>
          <li>
            {user ? (
              <button onClick={logoutUser}>Logout</button>
            ) : (
              <button onClick={() => navigate("/login")}>Sign In</button>
            )}
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
