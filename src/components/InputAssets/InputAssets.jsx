import React from "react";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import AssetExampleModal from "../AssetExampleModal/AssetExampleModal";
import "./InputAssets.css";

const InputAssets = (props) => {
  const [assetType, setAssetType] = useState("Cash");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [user, token] = useAuth();
  const [showModal, setShowModal] = useState(false);

  async function addUserAssets(userAssets) {
    const response = await axios.post(
      "https://cors-anywhere.herokuapp.com/api/assets/",
      userAssets,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 201) {
      console.log("user Assets posted.");
    }
  }

  async function updateNetWorth() {
    const response = await axios.get(
      "https://cors-anywhere.herokuapp.com/api/networth/onceaday/",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let userAssets = {
      asset_type: assetType,
      value: value,
      date: date,
    };
    await addUserAssets(userAssets).then((response) => updateNetWorth());
  };

  return (
    <div className="container">
      <br></br>
      <div className="container">
        <div className="examplesdiv">
          <p onClick={() => setShowModal(true)}>
            Need help thinking of Asset ideas? <h3>Click Here</h3>
          </p>
          <AssetExampleModal
            open={showModal}
            onClose={() => setShowModal(false)}
          />
        </div>
      </div>
      <br></br>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="inputassets">
          <div className="container">
            <label className="container">
              Please select which asset you'd like to input:
              <div>
                <select
                  value={assetType}
                  onChange={(event) => setAssetType(event.target.value)}
                >
                  <option value="Cash">Cash Accounts</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Brokerage">Brokerage Accounts</option>
                  <option value="Retirement">Retirement Accounts</option>
                  <option value="Misc">Miscellaneous Assets</option>
                </select>
              </div>
            </label>
          </div>
          <div>
            <label>Please input the value of the asset:</label>
          </div>
          <input
            type="number"
            value={value}
            onChange={(event) => setValue(parseInt(event.target.value))}
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
            <div className="buttonspacer"></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputAssets;
