import React from "react";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./ProjectedIncome.css";

const ProjectedIncome = (props) => {
  const [incomeType, setIncomeType] = useState("Total");
  const [value, setValue] = useState(0);
  const [date, setDate] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [recurring, setRecurring] = useState("Yes");
  const [user, token] = useAuth();

  async function addUserIncome(userIncome) {
    const response = await axios.post(
      "https://cors-anywhere.herokuapp.com/http://finfitnessbackend-env.eba-55w3f9b3.us-west-1.elasticbeanstalk.com/api/income/",
      userIncome,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 201) {
      console.log("user Income posted.");
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let userIncome = {
      income_type: incomeType,
      value: value,
      date: date,
      frequency: frequency,
      recurring: recurring,
    };
    await addUserIncome(userIncome);
  };

  return (
    <div className="inputassets">
      <br></br>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <label>Total Projected Income every month:</label>
        </div>
        <input
          type="number"
          value={value}
          onChange={(event) => setValue(parseInt(event.target.value))}
        ></input>
        <div>
          <label>Date of estimation?</label>
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
      </form>
    </div>
  );
};

export default ProjectedIncome;
