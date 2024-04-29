import classes from "./TaskTimeline.module.css";

const TaskTimeline = (props) => {
  return (
    <p className={`${classes.taskTimeline} ${props.className}`}>
      {props.taskTimeline}
    </p>
  );
};

export default TaskTimeline;
