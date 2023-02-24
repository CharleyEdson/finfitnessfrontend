import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { Chart } from "react-google-charts";
import UpdateBudgetModal from "../UpdateBudgetModal/UpdateBudgetModal";
import "./CashFlow.css";

const CashFlow = ({ cashFlow }) => {
  const [user, token] = useAuth();

  // https://developers.google.com/chart/interactive/docs/gallery/linechart
  // to style charts
  const options = {
    title: "Cash Flow",
    titleColor: "#48CAE4",
    legend: "none",
    is3d: true,
    lineWidth: 1,
    bar: { width: 25 },
    corsshair: { trigger: "focus" },
    chartArea: {
      backgroundColor: {
        fill: "#89D1E6",
        fillOpacity: 0,
      },
    },
    bars: "vertical",
    opacity: 0.2,
  };

  let data = [["Month", "Net Cash Flow", { role: "style" }]];
  data = data.concat(
    cashFlow.map((el) => Object.values(el).slice(2, 4).concat("color: #334A51; opacity: 1; stroke-color: #96AFB8; stroke-width: 1;")).reverse());

  return (
    <div>
      {cashFlow ? (
        <div className="networthcontainer">
          <div className="nameheaders">
            <p className="networth_cash">Net Cash Flow </p>
          </div>
          <div>
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="200px"
              data={data}
              options={options}
            />
          </div>
        </div>
      ) : (
        <div> test</div>
      )}
    </div>
  );
};
export default CashFlow;
