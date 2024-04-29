import reactDOM from "react-dom";
import classes from "./CreatePassword.module.css";
import Modal from "../Modal";
import { FaCheck } from "react-icons/fa";
import Button from "../Button";

const Popup = (props) => {
  const modalHelper = reactDOM.createPortal(
    <Modal
      onBackdrop={props.onBackdrop}
      className={classes.modal}
      icon={<FaCheck />}
      btn={
        <Button
          className={classes.btn}
          text={props.popupBtnText}
          onClick={props.onClose}
        />
      }
      children={<p>{props.popupText}</p>}
    />,
    document.getElementById("modal")
  );
  return modalHelper;
};

export default Popup;
