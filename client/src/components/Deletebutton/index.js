import React from "react";
import "./style.css";

function Deletebutton(props) {

  return (
    <span className="delete-btn" {...props} role="button" tabIndex="0">
      ✗ Delete ✗
    </span>
  );
}

export default Deletebutton;
