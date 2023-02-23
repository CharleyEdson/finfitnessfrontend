import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { Chart } from "react-google-charts";
import "./NetWorth.css";

const NetWorth = ({ netWorth, changeInNetWorth }) => {
  const [user, token] = useAuth();

  const options = {
    title: "Net Worth",
    titleColor: "#48CAE4",
    legend: "none",
    is3d: true,
    lineWidth: 1,
    curveType: "function",
    colors: ["#0096C7"],
    crosshair: { trigger: "focus" },
    chartArea: {
      backgroundColor: {
        fill: "#0096C7",
        fillOpacity: 0,
      },
    },
    // backgroundColor: {
    //   fill: "#89D1E6",
    //   fillOpacity: .5,
    // },
  };

  let data = [["Date", "NetWorth"]];

  data = data.concat(
    netWorth.map((el) => Object.values(el).splice(0, 2)).reverse()
  );

  return (
    <>
      <div className="networthcontainer">
        <div className="nameheaders">
          <p className="networth_cash">Net Worth ${netWorth[0]["netWorth"]}</p>
          {changeInNetWorth === undefined ? null : (
            <p className={changeInNetWorth >= 0 ? "up" : "down"}>
              &ensp; (${changeInNetWorth})
            </p>
          )}
        </div>
        <div className="border">
          <Chart
            chartType="LineChart"
            width="100%"
            height="200px"
            data={data}
            options={options}
          />
        </div>
      </div>
    </>
  );
};

export default NetWorth;
