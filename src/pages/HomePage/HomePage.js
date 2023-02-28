import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./HomePage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import UserNavBar from "../../components/UserNavBar/UserNavBar";
import FactFinder from "../../components/FactFinder/FactFinder";
import NetWorth from "../../components/NetWorth/NetWorth";
import CashFlow from "../../components/CashFlow/CashFlow";
import Recommendations from "../../components/Recommendations/Recommendations";
import Navbar from "../../components/NavBar/NavBar";
import "./HomePage.css";

const HomePage = (props) => {
  const [user, token] = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [userAssets, setUserAssets] = useState([""]);
  const [netWorth, setNetWorth] = useState([]);
  const [cashFlow, setCashFlow] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [income, setIncome] = useState();
  const [changeInNetWorth, setChangeInNetWorth] = useState();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetchUserInfo();
    fetchCashFlow();
    fetchNetWorth();
    fetchIncome();
    const today = new Date();
    const dayOfWeek = today.getDay();
    const isMonday = dayOfWeek === 1;

    if (isMonday) {
      setShowAlert(true);
    }
  }, []);

  const fetchUserInfo = async () => {
    try {
      let response = await axios
        .get(
          `https://cors-anywhere.herokuapp.com//http://finfitnessbackend-env.eba-55w3f9b3.us-west-1.elasticbeanstalk.com/api/userinfo/`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          setUserInfo(response["data"][0]);
        });
    } catch (error) {
      console.log(error.response);
      setUserInfo({
        phone_number: "9999999999",
        age: 30,
        gender: "male",
        occupation: "test",
        risk_level: 6,
        state_living_in: "CA",
        relationship_status: "Single",
        verified_facts: false,
      });
      console.log(userInfo);
    }
  };

  const fetchCashFlow = async () => {
    try {
      let response = await axios
        .get(
          "https://cors-anywhere.herokuapp.com//http://finfitnessbackend-env.eba-55w3f9b3.us-west-1.elasticbeanstalk.com/api/cashflow/historicalnetcashflow/",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          setCashFlow(response["data"]);
        });
    } catch (error) {
      console.log(error.response);
      setCashFlow({date: "2023-02-24", id: 11, month: "1", net_cash_flow: 30000, user_id:9,year:"2023"});
    }
  };

  const fetchNetWorth = async () => {
    try {
      let response = await axios.get(
        `https://cors-anywhere.herokuapp.com//http://finfitnessbackend-env.eba-55w3f9b3.us-west-1.elasticbeanstalk.com/api/networth/historicalnetworth/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setNetWorth(response["data"]);
      try {
        setChangeInNetWorth(
          response["data"][0].netWorth - response["data"][1].netWorth
        );
      } catch (error) {}
    } catch (error) {
      console.log(error.response);
      setNetWorth({date: "2023-02-24", id: 20, netWorth: 510000, user_id: 9});
    }
  };

  async function fetchIncome() {
    try {
      let response = await axios.get(
        "https://cors-anywhere.herokuapp.com//http://finfitnessbackend-env.eba-55w3f9b3.us-west-1.elasticbeanstalk.com/api/income/",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setIncome(response["data"][0]);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <>
      <UserNavBar />
      <div className={`content ${isOpen ? "push" : ""}`}>
        <div className="background">
          <br></br>
          <div>
            <br></br>
            <br></br>
            {showAlert && (
              <div className="container">
                <h2>Please make sure to update your Data!</h2>
                <button onClick={() => setShowAlert(false)}>Close</button>
              </div>
            )}
          </div>
          <div>
            {userInfo ? (
              <div>
                <br></br>
                <br></br>
                <p className="welcomehome">Welcome Back, {user.first_name}!</p>
                {netWorth[0] ? (
                  <div className="center-component">
                    <div className="box">
                      <NetWorth
                        className="component"
                        netWorth={netWorth}
                        changeInNetWorth={changeInNetWorth}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="center-component">
                    Please go to the edit page to add assets and liabilities to
                    display net worth
                  </p>
                )}
                <br></br>
                {cashFlow[0] ? (
                  <div className="center-component">
                    <div className="box">
                      <CashFlow className="component" cashFlow={cashFlow} />
                    </div>
                  </div>
                ) : (
                  <p className="center-component">
                    Please got to the edit page to add monthly income & expenses
                    to display cash flow.
                  </p>
                )}
                <br></br>
                {income ? (
                  <div className="center-component">
                    <div className="box">
                      <Recommendations className="component" income={income} />
                    </div>
                  </div>
                ) : (
                  <p className="center-component">
                    Please report a month's income before we can recommend
                    anything. You can do this at the edit page.
                  </p>
                )}

                <br></br>
              </div>
            ) : (
              <FactFinder />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
