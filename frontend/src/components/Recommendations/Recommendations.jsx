import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useEffect } from "react";
import "./Recommendations.css";

const Recommendations = ({ income }) => {
  const [user, token] = useAuth();

  // async function fetchIncome() {
  //   try {
  //     let response = await axios.get("http://127.0.0.1:8000/api/income/", {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     });
  //     setIncome(response["data"][0]);
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // }

  return (
    <div>
      <div className="recommendationscontainer">
        <p className="header">Recommendations</p>
        <p className="header">
          Based upon your monthly income of{" "}
          <p className="income"> (${parseInt(income.value)}):</p>
        </p>
        <div className="recs">
          <li className="recsfont">
            Spend a maximum on monthly rent/mortgage expenses of:
            <p className="value"> ${parseInt(0.36 * income.value)}</p>
          </li>
          <div className="spacer"></div>
          <div className="spacer"></div>
          <li className="recsfont">
            Invest monthly the following total in retirement and regular
            accounts: <p className="value"> ${parseInt(0.2 * income.value)}</p>
          </li>
          <div className="spacer"></div>
          <div className="spacer"></div>
          <li className="recsfont">
            Allocate the following monthly amount for discretionary expenses,
            like entertainment and or traveling:
            <p className="value"> ${parseInt(0.3 * income.value)}</p>
          </li>
          <div className="spacer"></div>
          <div className="spacer"></div>
          <li className="recsfont">
            Allocate the following monthly amount for other essentials like
            food, health care, transportation:
            <p className="value"> ${parseInt(0.14 * income.value)}</p>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
