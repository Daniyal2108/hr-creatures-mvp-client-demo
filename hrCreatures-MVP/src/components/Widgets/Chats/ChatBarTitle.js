import classes from "./ChatBarTitle.module.css";

const ChatBarTitle = (props) => {
  return (
    <>
      <div className={`${classes.title} ${props.className}`}>
        {props.titles.map((title, index) => (
          <h3 key={index}>{title ? title : "title"}</h3>
        ))}
      </div>
      <hr className={classes.horizontalLine1} />
      <hr className={classes.horizontalLine2} />
    </>
  );
};

export default ChatBarTitle;
