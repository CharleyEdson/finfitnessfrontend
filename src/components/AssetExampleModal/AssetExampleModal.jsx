import React, { useState, useEffect } from "react";
import "./AssetExampleModal.css";

const AssetExampleModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="examples">
      <p className="assettype">For Cash accounts:</p>
      <p className="example">Think bank accounts, CD's, etc</p>
      <p className="assettype">For Brokerage accounts:</p>
      <p className="example">
        Think of any non-retirement investment accounts that you have,
        ie-robinhood, crypto, etc.
      </p>
      <p className="assettype">For Retirement accounts:</p>
      <p className="example">
        {" "}
        Think of any company retirement plan, ie 401(k), IRA, Roth IRA, etc.
      </p>
      <p className="assettype">For Real Estate:</p>
      <p className="example"> Think of any homes, or rental properties</p>
      <p className="assettype">For Misc:</p>
      <p className="example">
        Think of any other asset you have that keeps it's value.
      </p>

      <p className="close" onClick={onClose}>
        {" "}
        Close{" "}
      </p>
    </div>
  );
};

export default AssetExampleModal;
