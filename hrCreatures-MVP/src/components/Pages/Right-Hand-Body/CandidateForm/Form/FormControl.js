import classes from "./style.module.css";
import InputField from "../../../../UI/InputField";
import Label from "../../../../UI/Label";
import Dropdown from "../../../../UI/Dropdown";
import FileBar from "../../../../Widgets/FileBar";
import Button from "../../../../UI/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const FormControl = (props) => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("test/");
  };

  console.log(props?.inputProps.slice(7));

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      {props?.inputProps?.slice(0, 4).map((itm, index) => (
        <InputField key={index} {...itm} />
      ))}

      {props?.dropdown?.slice(0, 1).map((dropdownProps, i) => (
        <div key={i} className={classes.formControl}>
          <Label {...dropdownProps.label} key={dropdownProps.label.value} />
          <Dropdown {...dropdownProps.dropdown} key={i} />
        </div>
      ))}

      {props?.inputProps?.slice(4, 5).map((itm, index) => (
        <InputField key={index} {...itm} />
      ))}

      {props?.dropdown?.slice(1, 3).map((dropdownProps, i) => (
        <div key={i} className={classes.formControl}>
          <Label {...dropdownProps.label} key={dropdownProps.label.value} />
          <Dropdown {...dropdownProps.dropdown} key={i} />
        </div>
      ))}

      {props?.inputProps?.slice(5, 6).map((itm, index) => (
        <div className={`relative ${classes.file}`} key={index}>
          <InputField {...itm} key={index} />
        </div>
      ))}

      {props?.inputProps?.slice(6, 7).map((itm, index) => (
        <div className={`relative ${classes.file}`} key={index}>
          <FileBar
            className={classes.fileInput}
            fileFormat={<FaCloudUploadAlt />}
            fileName="Upload Resume"
          />
          <InputField {...itm} key={index} />
        </div>
      ))}

      {props?.inputsProps?.slice(7, 8).map((itm, i) => (
        <div key={i} className={classes.tagsInputContainer}>
          <Label {...itm} />
          <TagsInput
            value={skills}
            onChange={setSkills}
            name="skills"
            placeHolder="Enter Skills"
          />
        </div>
      ))}

      {props.dynamicInputs?.map((input, i) => (
        <div key={i} className={classes.formControl}>
          <label htmlFor={input[`label${i}`]} key={i} id={i}>
            {input[`label${i}`]}
          </label>
          <div className={classes.input}>
            <input
              type="text"
              placeholder="Answer..."
              name={Object.keys(input)[1]}
            />
          </div>
        </div>
      ))}

      <Button
        className={classes.btn}
        text="Save Template"
        btnImg=""
        alt="btn-icon"
      />
    </form>
  );
};

export default React.memo(FormControl);
