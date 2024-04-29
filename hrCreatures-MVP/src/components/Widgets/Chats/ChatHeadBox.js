import classes from "./ChatHeadBox.module.css";

const ChatHeadBox = (props) => {
  return (
    <div className={`${classes.box} ${props.className}`}>{props.children}</div>
  );
};

export default ChatHeadBox;
