import React from "react";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./InputLiabilities.css";

const InputLiabilities = () => {
  const [type_of_liability, setType_of_liability] = useState("Mortgage");
  const [value, setValue] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [date, setDate] = useState("");
  const [user, token] = useAuth();

  async function addUserLiabilities(userLiabilities) {
    const response = await axios.post(
      "https://cors-anywhere.herokuapp.com/http://finfitnessbackend-env.eba-55w3f9b3.us-west-1.elasticbeanstalk.com/api/liabilities/",
      userLiabilities,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 201) {
      console.log("user liabilities posted.");
    }
  }
  async function updateNetWorth() {
    const response = await axios.get(
      "https://cors-anywhere.herokuapp.com/http://finfitnessbackend-env.eba-55w3f9b3.us-west-1.elasticbeanstalk.com/api/networth/onceaday/",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let userLiabilities = {
      type_of_liability: type_of_liability,
      value: value,
      monthly_payment: monthlyPayment,
      date: date,
    };
    await addUserLiabilities(userLiabilities).then((response) =>
      updateNetWorth()
    );
  };

  return (
    <div className="container">
      <br></br>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="inputassets">
          <div>
            <label>
              Please select which liability you'd like to input:
              <div>
                <select
                  value={type_of_liability}
                  onChange={(event) => setType_of_liability(event.target.value)}
                >
                  <option value="Mortgage">Mortgage</option>
                  <option value="Auto Loan">Auto Loan</option>
                  <option value="Student Loan">Student Loan</option>
                  <option value="Credit Card Loan">Credit Card Loan</option>
                  <option value="Misc">Miscellaneous Loans</option>
                </select>
              </div>
            </label>
          </div>
          <div>
            <label>Please input the value of the Liability:</label>
          </div>
          <input
            type="number"
            value={value}
            onChange={(event) => setValue(parseInt(event.target.value))}
          ></input>
          <div>
            <label>Please input the monthly Payment:</label>
          </div>
          <input
            type="number"
            value={monthlyPayment}
            onChange={(event) =>
              setMonthlyPayment(parseInt(event.target.value))
            }
          ></input>
          <div>
            <label>Please input the Date of value for the asset:</label>
          </div>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          ></input>
          <div className="buttonspacer"></div>
          <div>
            <button className="container" type="submit">
              Submit Info
            </button>
          </div>
          <div className="buttonspacer"></div>
        </div>
      </form>
    </div>
  );
};

export default InputLiabilities;
