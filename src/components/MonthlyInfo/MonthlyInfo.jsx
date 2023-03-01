import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useEffect } from "react";
import InputIncExp from "../InputIncExp/InputIncExp";

const MonthlyInfo = (props) => {
  const [user, token] = useAuth();
  const [historicincexp, setHistoricIncExp] = useState([
    {
      current_income: 11000,
      date: "2023-02-01",
      id: 3,
      current_expense: 8000,
      month: "February",
      user_id: 2,
      year: "2023",
    },
    {
      current_expense: 8000,
      current_income: 11000,
      date: "2023-02-01",
      id: 3,
      month: "February",
      user_id: 2,
      year: "2023",
    },
  ]);
  const [info, setInfo] = useState(false);

  useEffect(() => {
    fetchUserExpenses();
  }, []);

  function formatMonth() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    if (month === 0) {
      month = 12;
    }
    if (month < 10) {
      month = "0" + month;
    }

    if (day < 10) {
      day = "0" + day;
    }
    return month;
  }
  function getMonthName(month) {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[month - 1];
  }

  let currentMonth = getMonthName(formatMonth());

  function formatYear() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    return year;
  }

  let currentYear = formatYear();

  function formatDate() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    return year + "-" + month + "-" + day;
  }

  let date = formatDate();

  const fetchUserExpenses = async () => {
    try {
      let response = await axios.get(
        `https://cors-anywhere.herokuapp.com/http://finfitnessbackend-env.eba-55w3f9b3.us-west-1.elasticbeanstalk.com/api/currentincexp/historicalcurrents/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data.length === 0) {
        console.log("its blank!");
        setInfo(true);
      } else {
        setHistoricIncExp(response["data"]);
        console.log("This should have ran if there was data!");
      }
    } catch (error) {
      console.log(error.response);
      console.log(historicincexp);
    }
  };

  console.log(historicincexp[0]);

  return (
    <div className="container">
      {info === true ? (
        <div>
          <p>You need to enter your first month's Income and Expense!</p>
          {/* This is where I put the InputIncExp component */}
        </div>
      ) : (
        <div></div>
      )}

      {console.log(historicincexp[0]["month"])}
      {historicincexp[0]["month"] === currentMonth ? (
        <div>Please wait until next month to update</div>
      ) : (
        <div>
          <InputIncExp currentYear={currentYear} currentDate={date} />
        </div>
      )}
    </div>
  );
};

export default MonthlyInfo;
