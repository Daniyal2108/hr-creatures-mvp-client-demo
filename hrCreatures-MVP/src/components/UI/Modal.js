import classes from "./Modal.module.css";

const Modal = (props) => {
  const modalElementsHelper = (
    <>
      {props.icon && props.icon}
      {props.children}
      {props.btn && (
        <div className={`${classes.modalBtn} ${props.btnContainer}`}>
          {props.btn}
        </div>
      )}
    </>
  );

  return (
    <>
      <div
        className={`${classes.modalBackdrop} ${props.backdropClass}`}
        onClick={props.onBackdrop}
      ></div>
      <div className={`${classes.modal} ${props.className}`}>
        {modalElementsHelper}
      </div>
    </>
  );
};

export default Modal;
