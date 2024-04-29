import { useEffect } from "react";
import classes from "./Dropdown.module.css";

const Dropdown = (props) => {
  const data = props.dropdownData;
  const id = Array.isArray(props.id) ? props.id[0]?._id : props.id;
  const { name, onId } = props;
  useEffect(() => {
    onId && onId({ id, name });
  }, [onId, id, name]);
  const options = data.map((data, index) => (
    <option
      key={index}
      id={data._id}
      className={classes.options}
      value={data.name ? data.name : data}
    >
      {data.name ? data.name : data}
    </option>
  ));

  return (
    <select
      onChange={props.onChange}
      value={props.value}
      id={id}
      name={props.name}
      className={`${props.className} ${classes.dropdown}`}
      style={props.style}
    >
      <option value="" disabled hidden>
        {props.selected}
      </option>
      {options}
    </select>
  );
};

export default Dropdown;
