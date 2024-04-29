import reactDOM from "react-dom";
import React from "react";
import classes from "./style.module.css";
import Modal from "../../../UI/Modal";
import Button from "../../../UI/Button";
import { FaCheck } from "react-icons/fa";

const ProfileModal = ({ editDetails, setEditDetails, setIsModal, isModal }) => {
  const modalHelper = reactDOM.createPortal(
    <Modal
      onBackdrop={() => setIsModal(false)}
      className={classes.modal}
      icon={<FaCheck />}
      btnContainer={`flex justify-center items-center ${classes.modalbtnContainer}`}
      btn={
        <>
          <Button
            className={classes.modalbtn}
            onClick={() => {
              setIsModal(false);
              setEditDetails(!editDetails);
            }}
            text={"Close"}
          />
        </>
      }
    >
      {<p>Profile Updated Successfully</p>}
    </Modal>,
    document.getElementById("modal")
  );

  return <>{isModal && modalHelper}</>;
};

export default ProfileModal;
