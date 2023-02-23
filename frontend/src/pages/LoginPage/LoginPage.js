import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import Navbar from "../../components/NavBar/NavBar";
import "./LoginPage.css";

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  return (
    <div className="background">
      <div>
        <Navbar />
      </div>
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
              Password:{" "}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </label>
            {isServerError ? (
              <p className="error">Login failed, incorrect credentials!</p>
            ) : null}
            <div className="buttonstyle">
              <Link className="createaccount" to="/register">
                Click to Create an Account
              </Link>
              <button className="registerbutton">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
