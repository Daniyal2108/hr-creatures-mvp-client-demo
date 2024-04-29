import classes from "./style.module.css";

const inputsProps = [
  {
    className: classes.formControl,
    label: {
      value: "Add Title",
      properties: {
        htmlFor: "add-title",
      },
    },
    input: {
      className: classes.input,
      values: {
        type: "text",
        id: "add-title",
        name: "title",
        placeholder: "Type...",
      },
    },
  },
  {
    className: classes.formControl,
    label: {
      value: "Time Allowed",
      properties: {
        htmlFor: "time-allowed",
      },
    },
    input: {
      className: classes.timeInput,
      values: {
        type: "number",
        id: "time-allowed",
        name: "timeAllowed",
        placeholder: "0",
      },
    },
  },
  {
    label: {
      value: "Other Details",
      properties: {
        htmlFor: "other-details",
      },
    },
    textarea: {
      placeholder: "Type...",
      className: classes.textarea,
      name: "otherDetails",
    },
  },
];

export { inputsProps };
