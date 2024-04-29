import classes from "./style.module.css";
import reactDOM from "react-dom";
import Modal from "../../../../UI/Modal";
import Button from "../../../../UI/Button";
import { Link } from "react-router-dom";
import React from "react";

const Popup = (props) => {
  const modalHelper = reactDOM.createPortal(
    <Modal
      onBackdrop={props.onBackdrop}
      className={classes.modal}
      btn={
        props.err || props.questioniareErr ? (
          <Button text="Close" onClick={props.onClick} />
        ) : (
          <Link to={"/my-templates/add-new/"} className={classes.navigationBtn}>
            Add Templates
          </Link>
        )
      }
      children={
        <p className={(props.err || props.questioniareErr) && classes.error}>
          {props.err || props.questioniareErr
            ? props.questioniareErr || props.err
            : props.response?.data?.length < 1 &&
              props.questioniareRes?.data?.length < 1
            ? "Add Vacancy && Questioniare Template first."
            : (props.response?.data?.length < 1 &&
                "Add Vacancy Template first.") ||
              (props.questioniareRes?.data?.length < 1 &&
                "Add Questioniare Template first.")}
        </p>
      }
    />,
    document.getElementById("modal")
  );

  return props.isModal && modalHelper;
};

export default React.memo(Popup);
