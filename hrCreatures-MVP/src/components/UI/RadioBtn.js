import classes from "./RadioBtn.module.css";

const RadioBtn = (props) => {
  return (
    <div className={`${props.className} ${classes.radioBtns}`}>
      {props.radioBtns.map((radioBtn, index) => (
        <div key={index}>
          <input {...radioBtn.input.values} />
          <label {...radioBtn.label.properties}>{radioBtn.label.value}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioBtn;
