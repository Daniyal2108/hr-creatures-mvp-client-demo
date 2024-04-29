import classes from "./ChatHead.module.css";

const ChatHead = (props) => {
  const id = props.id;
  return (
    <div
      className={`${props.isActive && classes.chatHeadActive} ${
        classes.chatHead
      } ${props.isActive && props.className}`}
      id={id}
      onClick={() => props.onTab(id)}
    >
      {props.isActive && (
        <div className={`${classes.leftBorder} ${props.leftBorderClass}`}></div>
      )}
      <h3>{props.chatHeadTitle}</h3>
      <p>{props.chatHeadDescription}</p>
      {props.isActive && (
        <div
          className={`${classes.rightBorder} ${props.rightBorderClass}`}
        ></div>
      )}
    </div>
  );
};

export default ChatHead;
