import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./FactFinder.css";
import useAuth from "../../hooks/useAuth";

const FactFinderUpdate = ({ userInfo }) => {
  const [phoneNumber, setPhoneNumber] = useState(userInfo.phone_number);
  const [age, setAge] = useState(userInfo.age);
  const [gender, setGender] = useState("Male");
  const [occupation, setOccupation] = useState(userInfo.occupation);
  const [stateLivedIn, setStateLivedIn] = useState(userInfo.state_living_in);
  const [relationshipStatus, setRelationshipStatus] = useState(
    userInfo.relationship_status
  );
  const [riskAppetite, setRiskAppetite] = useState(userInfo.risk_level);
  const [verified, setVerified] = useState(false);
  const [user, token] = useAuth();

  async function updateUserInfo(info) {
    const response = await axios.put(
      `https://cors-anywhere.herokuapp.com/http://finfitnessbackend-env.eba-55w3f9b3.us-west-1.elasticbeanstalk.com/api/userinfo/${userInfo.id}/`,
      info,
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    let updatedUserInfo = {
      phone_number: phoneNumber,
      age: age,
      gender: gender,
      occupation: occupation,
      risk_level: riskAppetite,
      state_living_in: stateLivedIn,
      relationship_status: relationshipStatus,
      verified_facts: verified,
    };
    console.log(updatedUserInfo);
    await updateUserInfo(updatedUserInfo);
  };

  return (
    <div className="container">
      <div>
        <p>Edit Profile Information Below</p>
        <br></br>
      </div>
      <div className="box">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div>
            <label>Phone Number</label>
          </div>
          <input
            type="text"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          ></input>

          <div>
            <label>Age</label>
          </div>
          <input
            type="number"
            value={age}
            onChange={(event) => setAge(parseInt(event.target.value))}
          ></input>
          <div>
            <label>
              Gender
              <div>
                <select
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
          <div>
            <label>Occupation</label>
          </div>
          <input
            type="text"
            value={occupation}
            onChange={(event) => setOccupation(event.target.value)}
          ></input>
          <div>
            <label>State Living In</label>
          </div>
          <input
            type="text"
            value={stateLivedIn}
            onChange={(event) => setStateLivedIn(event.target.value)}
          ></input>
          <div>
            <label>Relationship Status</label>
          </div>
          <input
            type="text"
            value={relationshipStatus}
            onChange={(event) => setRelationshipStatus(event.target.value)}
          ></input>
          <div>
            <label>Risk Appetite</label>
            <p className="riskexplanation">
              (Number 1-10. 1 being least risky, 10 being most risky)
            </p>
          </div>
          <input
            type="number"
            value={riskAppetite}
            onChange={(event) => setRiskAppetite(parseInt(event.target.value))}
          ></input>
          <div>
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
          <div>
            <button type="submit">Submit Info</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FactFinderUpdate;
