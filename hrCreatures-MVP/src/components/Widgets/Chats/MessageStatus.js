import classes from "./MessageStatus.module.css";

const MessageStatus = (props) => {
  return <small className={classes.status}>{props.status}</small>;
};

export default MessageStatus;
