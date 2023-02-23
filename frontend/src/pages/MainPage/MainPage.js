import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../components/NavBar/NavBar";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./MainPage.css";
import moneytree from "../../assets/treemoney.png";
import finances from "../../assets/finances.png";
import assets from "../../assets/assets.png";
import budget from "../../assets/budget.png";

const MainPage = () => {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
    }
    return () => (mounted = false);
  }, []);

  const navigate = useNavigate();
  return (
    <div className="background">
      <div>
        <Navbar />
      </div>
      <div className="contentcontainer">
        <div className="small">
          <div className="topcontent">
            <div className="wordsdiv">
              <p className="title">Financial fitness,</p>
              <p className="title">starts here</p>
              <br></br>
              <button className="signup" onClick={() => navigate("/register")}>
                Sign Up Here
              </button>
            </div>
            <div className="topphoto">
              <img src={moneytree} alt="picture of money and tree." />
            </div>
          </div>
          <br></br>
          <div className="featuresdiv">
            <p className="localtitle">Features:</p>
          </div>
          <br></br>
          <div className="bottomcontent">
            <div className="finances">
              <div>
                <img
                  src={finances}
                  alt="picture of man looking at a computer with his personal finances on it."
                />
              </div>
              <div className="spacer"></div>
              <div className="wordscontent">
                <p className="featurewords">Display your </p>
                <p className="featurewords">finances</p>
                <p className="description">See your finances</p>
                <p className="description">grow over time.</p>
                <button
                  className="signup"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </button>
              </div>
            </div>
            <br></br>
            <div className="visualize">
              <div>
                <img
                  src={assets}
                  alt="picture of computer with financial metrics on it."
                />
              </div>
              <div className="spacer"></div>
              <div className="wordscontent">
                <p className="featurewords">Visualize your assets</p>
                <p className="description">See all of your assets </p>
                <p className="description">in once convenient location.</p>
                <button
                  className="signup"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </button>
              </div>
            </div>
            <br></br>
            <div className="budget">
              <div>
                <img
                  src={budget}
                  alt="picture of computer with financial metrics on it."
                />
              </div>
              <div className="spacer"></div>
              <div className="wordscontent">
                <p className="featurewords">Stick to your budget</p>
                <p className="description">Visualize your budget.</p>
                <p className="description"> Track your budget.</p>
                <p className="description">Aid how and what to budget.</p>
                <button
                  className="signup"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </button>
              </div>
            </div>
            <p></p>
          </div>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
