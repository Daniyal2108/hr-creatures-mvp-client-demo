import Button from "../UI/Button";
import classes from "./TaskBox.module.css";

export const TaskBoxTitle = (props) => {
  return (
    <div className={classes.task}>
      <h3>{props.task}</h3>
      <p style={{ color: props.color }}>{props.taskReview}</p>
    </div>
  );
};

const TaskBox = (props) => {
  return (
    <div className={`${classes.taskBox} ${props.className}`}>
      <div>
        {props.data.map((data, index) => (
          <TaskBoxTitle
            key={index}
            task={data.task}
            color={data.color}
            taskReview={data.tasksReview}
          />
        ))}
      </div>

      <div>
        {props.box && props.children}
        {props.btn && <Button className={props.btnClassname} />}
      </div>
    </div>
  );
};

export default TaskBox;
