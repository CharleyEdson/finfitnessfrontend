import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./EditPage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import UserNavBar from "../../components/UserNavBar/UserNavBar";
import InputAssets from "../../components/InputAssets/InputAssets";
import InputLiabilities from "../../components/InputLiabilities/InputLiabilities";
import Budget from "../Budget/Budget";
import FactFinderUpdate from "../../components/FactFinder/FactFinderUpdate";
import MonthlyInfo from "../../components/MonthlyInfo/MonthlyInfo";
import ProjectedIncome from "../../components/ProjectedIncome/ProjectedIncome";

const EditPage = (props) => {
  const [editButtons, setEditButons] = useState(true);
  const [monthlyInfo, setMonthlyInfo] = useState(false);
  const [assetsLiabilities, setAssetsLiabilities] = useState(false);
  const [updateBudget, setUpdateBudget] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const [projectedIncome, setProjectedIncome] = useState(false);
  const [user, token] = useAuth();
  const [userInfoObject, setUserInfoObject] = useState({});

  useEffect(() => {
    fetchUserInfo();
  }, []);

  async function fetchUserInfo() {
    try {
      let response = await axios.get("https://cors-anywhere.herokuapp.com/api/userinfo/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUserInfoObject(response["data"][0]);
    } catch (error) {
      console.log(error.response);
    }
  }

  function handleEditButtons() {
    setEditButons(true);
    setMonthlyInfo(false);
    setAssetsLiabilities(false);
    setUpdateBudget(false);
    setUserInfo(false);
    setProjectedIncome(false);
  }
  function handleMonthlyInfoSubmit() {
    setEditButons(false);
    setMonthlyInfo(true);
    setAssetsLiabilities(false);
    setUpdateBudget(false);
    setUserInfo(false);
  }
  function handleALSubmit() {
    setEditButons(false);
    setMonthlyInfo(false);
    setAssetsLiabilities(true);
    setUpdateBudget(false);
    setUserInfo(false);
  }
  function handleBudgetSubmit() {
    setEditButons(false);
    setMonthlyInfo(false);
    setAssetsLiabilities(false);
    setUpdateBudget(true);
    setUserInfo(false);
  }
  function handleUserInfoSubmit() {
    setEditButons(false);
    setMonthlyInfo(false);
    setAssetsLiabilities(false);
    setUpdateBudget(false);
    setUserInfo(true);
  }
  function handleProjectedIncomeSubmit() {
    setEditButons(false);
    setMonthlyInfo(false);
    setAssetsLiabilities(false);
    setUpdateBudget(false);
    setUserInfo(false);
    setProjectedIncome(true);
  }

  return (
    <>
      <UserNavBar />
      <br></br>
      <div className="background">
        <br></br>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        {editButtons === true ? (
          <div>
            <div className="buttons">
              <div className="row">
                <button onClick={handleALSubmit}>
                  Update or Add Assets & Liabilities
                </button>
                <button onClick={handleProjectedIncomeSubmit}>
                  Projected Income
                </button>
              </div>
              <div className="row">
                <button onClick={handleMonthlyInfoSubmit}>
                  Input Monthly Info
                </button>
                <button onClick={handleBudgetSubmit}>Budget</button>
              </div>
              <div className="row">
                <button onClick={handleUserInfoSubmit}>User Info</button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {monthlyInfo === true ? (
          <div className="container">
            <br></br>
            <p className="title">Please enter updated information here </p>
            <MonthlyInfo />
            <br></br>
            <button onClick={handleEditButtons} className="container">
              Complete
            </button>
          </div>
        ) : (
          <></>
        )}
        {assetsLiabilities === true ? (
          <div className="container">
            <div className="assetspacer"></div>
            <p className="title">Add assets/liabilities here:</p>
            <InputAssets />
            <InputLiabilities />
            <br></br>
            <button onClick={handleEditButtons} className="container">
              Complete
            </button>
          </div>
        ) : (
          <></>
        )}
        {updateBudget === true ? (
          <div>
            <br></br>
            <div className="container">
              <p className="title"> Your Personalized Budget </p>
              <Budget />
              <button className="container" onClick={handleEditButtons}>
                Complete
              </button>
            </div>
            <br></br>
          </div>
        ) : (
          <></>
        )}
        {userInfo === true ? (
          <div className="container">
            <FactFinderUpdate userInfo={userInfoObject} />
            <br></br>
            <button className="container" onClick={handleEditButtons}>
              Complete
            </button>
            <br></br>
          </div>
        ) : (
          <></>
        )}
        {projectedIncome === true ? (
          <div className="container">
            <br></br>
            <p className="title">
              What is your Projected Income for the year?{" "}
            </p>
            <ProjectedIncome />
            <br></br>
            <button className="container" onClick={handleEditButtons}>
              Complete
            </button>
            <br></br>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default EditPage;
