import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Slider, Box } from "@material-ui/core";
import "./UpdateBudgetModal.css";

const UpdateBudgetModal = ({ open, onClose, user, token }) => {
  const [value, setValue] = useState(20);
  const [income, setIncome] = useState(0);
  useEffect(() => {
    fetchIncome();
  }, []);
  if (!open) return null;

  async function fetchIncome() {
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/income/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setIncome(response["data"][0]);
    } catch (error) {
      console.log(error.response);
    }
  }

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

  let newdate = formatDate();

  const changeValue = (event, value) => {
    setValue(value);
  };

  async function adduserBudget(userBudget) {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/budget/",
      userBudget,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 201) {
      console.log("user Budget posted.");
    }
  }

  function handleSubmit(event) {
    let userBudget = {
      budget_value: value,
      date: newdate,
    };
    console.log(userBudget);
    adduserBudget(userBudget);
  }

  const getText = (value) => `${value}`;

  return (
    <div>
      <div className="box">
        <div className="container">
          <div>
            <p>Please use the slider to pick your monthly budget.</p>
            <p>
              Based upon your inputted information, below are the recommended
              values for expenses to help you determine your budget:
            </p>
            <div className="spacer"></div>
            <p>
              {" "}
              Mortgage/Rent:
              <p className="value"> ${parseInt(0.36 * income.value)}/month</p>
            </p>
            <p>
              {" "}
              Other Essentials(ie: food, health care, transportation):{" "}
              <p className="value"> ${parseInt(0.14 * income.value)}/month</p>
            </p>
            <p> Investing:</p>
            <p className="value"> ${parseInt(0.2 * income.value)}</p>
            <p> Discretionary/fun expendiures: </p>
            <p className="value">
              {" "}
              ${parseInt(0.3 * income.value)}
              /month
            </p>
            <p>
              {" "}
              For a total of:<p className="value"> ${parseInt(income.value)}</p>
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="container">
          <Box className="slider">
            <Slider
              value={value}
              onChange={changeValue}
              style={{ width: 300, color: "#A187AF" }}
              min={0}
              max={income.value * 1.3}
              defaultValue={20}
              step={50}
              getAriaValueText={getText}
              valueLabelDisplay="auto"
            />
          </Box>
          <button type="submit">Submit</button>
          <h2 onClick={onClose}> Close </h2>
        </form>
      </div>
    </div>
  );
};

export default UpdateBudgetModal;
