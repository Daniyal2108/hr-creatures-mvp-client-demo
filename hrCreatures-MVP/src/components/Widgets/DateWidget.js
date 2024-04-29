import { DatePicker, Space } from "antd";
import classes from "./DateWidget.module.css";

const DateWidget = (props) => {
  return (
    <div>
      <Space direction="horizontal">
        <DatePicker
          onChange={props.onChange}
          placeholder={props.placeholder}
          className={`${props.className} ${classes.date}`}
        />
        {props.dash && <span className={classes.dash}>-</span>}
        <DatePicker
          onChange={props.onChange}
          placeholder={props.placeholder}
          className={`${props.className} ${classes.date}`}
        />
        {props.render}
      </Space>
    </div>
  );
};

export default DateWidget;
