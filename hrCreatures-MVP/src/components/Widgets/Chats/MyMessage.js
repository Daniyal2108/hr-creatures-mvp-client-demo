import classes from "./MyMessage.module.css";

const MyMessage = (props) => {
  return (
    <div className={`${classes.text} ${props.className}`}>
      <small>{props.time && props.time}</small>
      <div>
        {props.msgs && props.msgs.map((msg, index) => <p key={index}>{msg}</p>)}
      </div>
    </div>
  );
};

export default MyMessage;
