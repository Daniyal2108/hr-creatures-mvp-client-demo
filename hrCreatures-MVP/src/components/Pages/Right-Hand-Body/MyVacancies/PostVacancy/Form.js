import React from "react";
import classes from "./style.module.css";
import { inputsProps, dropdown } from "./inputs";
import Loader from "../../../../UI/Loader";
import Label from "../../../../UI/Label";
import Dropdown from "../../../../UI/Dropdown";
import InputField from "../../../../UI/InputField";
import Button from "../../../../UI/Button";
import Card from "../../../../Layout/Card";

const Form = (props) => {
  const dropdownProps = dropdown.map((dropdown) => ({
    ...dropdown,
    dropdown: {
      ...dropdown.dropdown,
      style: {
        border: props.inputsErr[dropdown.dropdown.name] && "solid .2vw red",
      },
      selected: props.selected,
      onChange: props.inputHandler,
      onBlur: props.inputTouched,
      value: props.inputs[dropdown.dropdown.name],
      onId: props.getIdHandler,
      id: props.vacancyTemplateId
        ? props.vacancyTemplateId.filter(
            (item) => item.name === props.inputs[dropdown.dropdown.name]
          )
        : dropdown.dropdown.id,
      dropdownData: props.vacancyTemplateId
        ? props.vacancyTemplateId
        : dropdown.dropdown.dropdownData,
    },
  }));

  const inputProperties = inputsProps.map((prop) => ({
    ...prop,
    input: {
      ...prop.input,
      values: {
        ...prop.input.values,

        onChange: props.inputHandler,
        onBlur: props.inputTouched,
        value:
          prop.input.values.type === "checkbox"
            ? !props.inputs[prop.input.values.name]
            : props.inputs[prop.input.values.name],
        className: `${prop.input.values.type !== "checkbox" && classes.input} ${
          prop.input.values.type !== "checkbox"
            ? props.inputsErr[prop.input.values.name]
              ? classes.invalidInput
              : ""
            : ""
        }`,
      },
    },
  }));

  return (
    <Card className={classes.content}>
      <form onSubmit={props.submit}>
        {props.isLoading && <Loader className={classes.loader} />}
        {dropdownProps.map((dropdownProps, i) => (
          <div key={i} className={classes.formControl}>
            <Label {...dropdownProps.label} key={dropdownProps.label.value} />
            <Dropdown {...dropdownProps.dropdown} key={i} />
          </div>
        ))}
        {inputProperties.slice(0, 2).map((itm, index) => (
          <InputField key={index} {...itm} />
        ))}
        {props.parameters}
        <h3 className={classes.paramHeading}>Select Parameters</h3>
        {inputProperties.slice(2).map((itm, i) => (
          <InputField key={i} {...itm} />
        ))}

        <Button
          className={classes.btn}
          text="Add Questioniare"
          btnImg=""
          alt="btn-icon"
        />
      </form>
    </Card>
  );
};

export default React.memo(Form);
