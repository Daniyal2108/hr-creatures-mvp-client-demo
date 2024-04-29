import classes from "./Title.module.css";

const Title = (props) => {
  return (
    <h2 className={`${classes.title} ${props.className}`} style={props.style}>
      {props.title}
    </h2>
  );
};

export default Title;
