import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import Navbar from "../../components/NavBar/NavBar";
import { useNavigate, Link } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
  );

  return (
    <div className="background">
      <div>
        <Navbar />
      </div>
      {/* If i use className='Container', it centeres content. */}
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="box">
            <label className="titles">
              Username:{" "}
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </label>
            <label className="titles">
              First Name:{" "}
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </label>
            <label className="titles">
              Last Name:{" "}
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </label>
            <label className="titles">
              Email:{" "}
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </label>
            <label className="titles">
              Password:{" "}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </label>
            <div className="buttonstyle">
              <button className="registerbutton">Register</button>
            </div>
          </div>
          <p style={{ fontSize: "12px" }}>
            NOTE: Make this an uncommon password with characters, numbers, and
            special characters!
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
