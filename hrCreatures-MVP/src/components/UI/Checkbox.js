import classes from "./Checkbox.module.css";

const Checkbox = (props) => {
  return (
    <div className={`${props.className} ${classes.checkboxes}`}>
      {props.radioBtns.map((radioBtn, index) => (
        <div key={index} className={classes.singleCheckbox}>
          <input {...radioBtn.input.values} />
          <label {...radioBtn.label.properties}>{radioBtn.label.value}</label>
        </div>
      ))}
    </div>
  );
};

export default Checkbox;
