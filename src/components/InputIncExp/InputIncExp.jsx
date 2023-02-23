import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const InputIncExp = ({ currentDate }) => {
  const [user, token] = useAuth();
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  //   const [year, setYear] = useState("");
  //   const [month, setMonth] = useState("");
  const [date, setDate] = useState(currentDate);

  useEffect(() => {
    formatMonth();
    formatYear();
  }, []);

  async function postIncExp(currents) {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/currentincexp/createcurrents/",
      currents,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 201) {
      console.log("user current inc & exps posted.");
    }
  }

  async function calculateCashFlow() {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/currentincexp/",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  }

  function formatMonth() {
    var d = new Date();
    var month = d.getMonth();
    if (month === 0) {
      month = 12;
    }
    if (month < 10) {
      month = "0" + month;
    }
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
  let month = formatMonth();
  function formatYear() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    if (month === 0) {
      year = year - 1;
    }
    return year;
  }

  let year = formatYear();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let currents = {
      current_income: monthlyIncome,
      current_expense: monthlyExpense,
      year: year,
      month: month,
      date: date,
    };
    await postIncExp(currents).then((response) => calculateCashFlow());
  };

  return (
    <div className="container">
      <div className="box">
        <div className="inputassets">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div>
              <label>
                Please enter your total Income/cash flow for the previous month:
              </label>
            </div>
            <input
              type="number"
              value={monthlyIncome}
              onChange={(event) => setMonthlyIncome(event.target.value)}
            ></input>
            <div>
              <label>
                Please enter your total Expenses for the previous month:
              </label>
            </div>
            <input
              type="number"
              value={monthlyExpense}
              onChange={(event) => setMonthlyExpense(event.target.value)}
            ></input>
            <div className="buttonspacer"></div>
            <div>
              <button className="container" type="submit">
                Submit
              </button>
            </div>
            <div className="buttonspacer"></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputIncExp;
