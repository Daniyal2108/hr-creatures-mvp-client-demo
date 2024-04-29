import React from "react";
import { useState } from "react";
import Button from "../../../UI/Button";
import classes from "./style.module.css";

const ShowPassword = (props) => {
  const [toggle, setToggle] = useState(false);

  props.onType(toggle);

  return (
    <Button
      type="button"
      className={`${
        !props.editDetails
          ? classes.showButton
          : classes.showButtonOnEditDetails
      }`}
      onClick={() => setToggle(!toggle)}
      text={toggle ? "Hide" : "Show"}
    />
  );
};

export default ShowPassword;
