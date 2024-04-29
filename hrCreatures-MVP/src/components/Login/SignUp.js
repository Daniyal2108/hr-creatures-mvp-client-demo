import React from "react";
import classes from "./style.module.css";

const SignUp = (props) => {
  return (
    <div
      className={`${classes.signUp} ${props.className} flex justify-between items-center`}
    >
      <p>{props.question}</p>
      <span onClick={props.onSignUp}>{props.account}</span>
    </div>
  );
};

export default React.memo(SignUp);
