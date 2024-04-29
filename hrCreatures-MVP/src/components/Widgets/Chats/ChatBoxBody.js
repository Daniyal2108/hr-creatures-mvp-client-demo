import classes from "./ChatBoxBody.module.css";

const ChatBoxBody = (props) => {
  return (
    <div className={`${classes.chatBody} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default ChatBoxBody;
