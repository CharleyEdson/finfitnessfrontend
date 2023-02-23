import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./DataInputAL.css";
import { Link } from "react-router-dom";
import axios from "axios";
import UserNavBar from "../../components/UserNavBar/UserNavBar";
import InputAssets from "../../components/InputAssets/InputAssets";
import InputLiabilities from "../../components/InputLiabilities/InputLiabilities";
import "./DataInputAL.css";

const DataInputAL = (props) => {
  const [user, token] = useAuth();
  const [userAssets, setUserAssets] = useState([""]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
    }
    return () => (mounted = false);
  }, [user]);

  return (
    <div>
      <div>{<UserNavBar />}</div>
      <div className="spacer"></div>
      <div className="background">
        <div>
          <p>Please input your Assets</p>
          <InputAssets />
        </div>
        <div>
          <p>Please input your Liabilities</p>
          <InputLiabilities />
        </div>
      </div>
    </div>
  );
};

export default DataInputAL;
