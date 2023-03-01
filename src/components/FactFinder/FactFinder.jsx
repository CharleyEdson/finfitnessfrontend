import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useState } from "react";
import axios from "axios";
import "./FactFinder.css";
import useAuth from "../../hooks/useAuth";

const FactFinder = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("Male");
  const [occupation, setOccupation] = useState("");
  const [stateLivedIn, setStateLivedIn] = useState("");
  const [relationshipStatus, setRelationshipStatus] = useState("");
  const [riskAppetite, setRiskAppetite] = useState(0);
  const [verified, setVerified] = useState(false);
  const [user, token] = useAuth();
  const navigate = useNavigate();

  async function addUserInfo(newUserInfo) {
    const response = await axios.post(
      "https://cors-anywhere.herokuapp.com/http://finfitnessbackend-env.eba-55w3f9b3.us-west-1.elasticbeanstalk.com/api/userinfo/",
      newUserInfo,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 201) {
      console.log("user info created.");
    }
  }

  async function addUserAssets(userAssets) {
    const response = await axios.post(
      "https://cors-anywhere.herokuapp.com/http://finfitnessbackend-env.eba-55w3f9b3.us-west-1.elasticbeanstalk.com/api/assets/",
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
      "https://cors-anywhere.herokuapp.com/http://finfitnessbackend-env.eba-55w3f9b3.us-west-1.elasticbeanstalk.com/api/networth/onceaday/",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  }
  async function adduserBudget(userBudget) {
    const response = await axios.post(
      "https://cors-anywhere.herokuapp.com/http://finfitnessbackend-env.eba-55w3f9b3.us-west-1.elasticbeanstalk.com/api/budget/",
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

  const handleSubmit = async (event) => {
    // event.preventDefault();

    let newUserInfo = {
      phone_number: phoneNumber,
      age: age,
      gender: gender,
      occupation: occupation,
      risk_level: riskAppetite,
      state_living_in: stateLivedIn,
      relationship_status: relationshipStatus,
      verified_facts: verified,
    };
    let userAssets = {
      asset_type: "Cash",
      value: 0,
      date: "01/01/2023",
    };
    // adding in filler data for budget here
    let userBudget = {
      budget_value: 0,
      date: "01/01/2023",
    };
    adduserBudget(userBudget);
    addUserInfo(newUserInfo);
    await addUserAssets(userAssets).then((response) => updateNetWorth());
  };

  return (
    <div className="factscontainer">
      <br></br>
      <br></br>
      <p>Fact Finder</p>
      <p>To Effectively use this app...</p>
      <p>We need to learn more about you.</p>
      <div className="formcontainer">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="formcontainer">
            <div>
              <label>Phone Number</label>
            </div>
            <input
              className="inputboxes"
              type="text"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            ></input>
          </div>
          <div className="formcontainer">
            <div>
              <label>Age</label>
            </div>
            <input
              className="inputboxes"
              type="number"
              value={age}
              onChange={(event) => setAge(parseInt(event.target.value))}
            ></input>
          </div>
          <div className="formcontainer">
            <div>
              <label className="formcontainer">
                Gender
                <div>
                  <select
                    className="inputboxes"
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                    <option value="Non-Binary">Non-Binary</option>
                  </select>
                </div>
              </label>
            </div>
          </div>
          <div className="formcontainer">
            <div>
              <label>Occupation</label>
            </div>
            <input
              className="inputboxes"
              type="text"
              value={occupation}
              onChange={(event) => setOccupation(event.target.value)}
            ></input>
          </div>
          <div className="formcontainer">
            <div>
              <label>State Living In</label>
            </div>
            <input
              className="inputboxes"
              type="text"
              value={stateLivedIn}
              onChange={(event) => setStateLivedIn(event.target.value)}
            ></input>
          </div>
          <div className="formcontainer">
            <div>
              <label>Relationship Status</label>
            </div>
            <input
              className="inputboxes"
              type="text"
              value={relationshipStatus}
              onChange={(event) => setRelationshipStatus(event.target.value)}
            ></input>
          </div>
          <div className="formcontainer">
            <label>Risk Appetite</label>
            <p className="riskexplanation">
              (Number 1-10. 1 being least risky, 10 being most risky)
            </p>

            <input
              className="inputboxes"
              type="number"
              value={riskAppetite}
              onChange={(event) =>
                setRiskAppetite(parseInt(event.target.value))
              }
            ></input>
          </div>
          <div className="formcontainer">
            <label>
              Please click here to verify you've inputed all the data correctly
            </label>
            <div>
              <input
                type="radio"
                value={verified}
                onChange={(event) => setVerified(!verified)}
              />
            </div>
          </div>

          <br></br>
          <div className="formcontainer">
            <button type="submit">Submit Info</button>
            <Link to="/edit">
              <p>Click here to your Financial history!</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FactFinder;
