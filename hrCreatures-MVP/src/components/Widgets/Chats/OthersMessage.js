import classes from "./OthersMessage.module.css";

const OthersMessage = (props) => {
  return (
    <div className={`${classes.text} ${props.className}`}>
      <small>{props.time && props.time}</small>
      <div>
        <p>{props.msg && props.msg}</p>

        <span>{props.user && props.user}</span>
      </div>
    </div>
  );
};

export default OthersMessage;
