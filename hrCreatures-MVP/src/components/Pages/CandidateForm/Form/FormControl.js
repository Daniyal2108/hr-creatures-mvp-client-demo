import classes from "./style.module.css";
import { useValidate } from "../../../../Custom-hooks/useValidate";
import InputField from "../../../UI/InputField";
import Label from "../../../UI/Label";
import Dropdown from "../../../UI/Dropdown";
import FileBar from "../../../Widgets/FileBar";
import Button from "../../../UI/Button";
import React, { useState } from "react";
import { FaCheck, FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../../Custom-hooks/useFetch";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getVacancyResponseId } from "../../../../store/slices/candidate-form-slice";
import { FaCloudUploadAlt } from "react-icons/fa";
import Loader from "../../../UI/Loader";
import reactDOM from "react-dom";
import Modal from "../../../UI/Modal";
import { TagsInput } from "react-tag-input-component";

const FormControl = (props) => {
  const dispatch = useDispatch();
  const vacancyPostedId = useSelector(
    (state) => state.candidateVacancy.vacancyPostedId
  );
  const id = useSelector((state) => state.candidateVacancy.vacancyId);
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [skills, setSkills] = useState([]);
  const [isSkills, setIsSkills] = useState(false);
  const navigate = useNavigate();
  const [{ response, error }, postVacany] = useFetch(`result/generate/${id}`);
  const { inputHandler, inputTouched, submit, inputs, inputsErr } = useValidate(
    props.initialInputs,
    true,
    (data) => {
      setIsSkills(true);
      const { uploadCv } = data;
      const file = Array.isArray(uploadCv)
        ? uploadCv[0]
        : uploadCv.split("/")[uploadCv.split("/").length - 1];
      let inputData = {
        ...data,
        uploadCv: file,
        skills: JSON.stringify(skills),
      };

      console.log(inputData);
      let isValidate = true;
      for (let x in inputData) {
        if (!inputData[x]) {
          isValidate = false;
        }
      }

      if (!isValidate) return;
      setIsLoading(true);
      const formData = new FormData();
      for (let key in inputData) {
        formData.append(key, inputData[key]);
      }

      postVacany({
        method: "POST",
        body: formData,
      });
    }
  );

  useEffect(() => {
    if (error) {
      setIsLoading(false);
      setIsModal(true);
    }
  }, [error, response]);

  useEffect(() => {
    if (response?.data) {
      setIsLoading(false);
      dispatch(getVacancyResponseId(response?.data?._id));
      navigate("test/");
    }
  }, [response, navigate, dispatch]);

  useEffect(() => {
    if (vacancyPostedId) {
      navigate("test/");
    }
  }, [navigate, vacancyPostedId]);

  const inputsProperties = props.inputProps?.map((singleInput) => ({
    ...singleInput,
    input: {
      ...singleInput.input,
      className: `${singleInput.input.className} ${
        inputsErr[singleInput.input.values.name] && classes.invalidInput
      }`,
      values: {
        ...singleInput.input.values,
        onChange: inputHandler,
        onBlur: inputTouched,
        value:
          singleInput.input.values.type === "file"
            ? ""
            : inputs[singleInput.input.values.name],
      },
    },
    fileBar: {
      ...singleInput.fileBar,
      className: `${classes.fileInput} ${
        inputs[singleInput.input.values.name] && classes.fileUpload
      } ${inputs} ${
        inputsErr[singleInput.input.values.name] && classes.fileErr
      }`,
      fileFormat: inputs[singleInput.input.values.name] ? (
        <FaCheck />
      ) : (
        <FaUpload />
      ),
      fileName: inputs[singleInput.input.values.name]
        ? inputs[singleInput.input.values.name][0].name
        : singleInput.fileBar?.name,
    },
  }));

  const dropdownProperties = props.dropdown?.map((singleDropdown) => ({
    ...singleDropdown,
    dropdown: {
      ...singleDropdown.dropdown,
      style: {
        border: inputsErr[singleDropdown.dropdown.name] && "solid .2vw red",
      },
      onChange: inputHandler,
      value: inputs[singleDropdown.dropdown.name],
    },
  }));

  const modalHelper = reactDOM.createPortal(
    <Modal
      onBackdrop={() => setIsModal(false)}
      className={classes.modal}
      children={<p className={error && classes.errorMsg}>{error}</p>}
      btn={<Button text="Close" onClick={() => setIsModal(false)} />}
    />,
    document.getElementById("modal")
  );

  return (
    <>
      <h1 className={classes.title}>Fill This Form</h1>

      <form onSubmit={submit} className={classes.form}>
        {isModal && modalHelper}
        {isLoading && <Loader className={classes.loader} />}

        {inputsProperties?.slice(0, 4).map((itm, index) => (
          <InputField key={index} {...itm} />
        ))}

        {dropdownProperties?.slice(0, 1).map((dropdownProps, i) => (
          <div key={i} className={classes.formControl}>
            <Label {...dropdownProps.label} key={dropdownProps.label.value} />
            <Dropdown {...dropdownProps.dropdown} key={i} />
          </div>
        ))}

        {inputsProperties?.slice(4, 5).map((itm, index) => (
          <InputField key={index} {...itm} />
        ))}

        {dropdownProperties?.slice(1, 3).map((dropdownProps, i) => (
          <div key={i} className={classes.formControl}>
            <Label {...dropdownProps.label} key={dropdownProps.label.value} />
            <Dropdown {...dropdownProps.dropdown} key={i} />
          </div>
        ))}

        {inputsProperties?.slice(5, 6).map((itm, index) => (
          <div className={`relative ${classes.file}`} key={index}>
            <InputField {...itm} key={index} />
          </div>
        ))}

        {inputsProperties?.slice(6, 7).map((itm, index) => (
          <div className={`relative ${classes.file}`} key={index}>
            <FileBar
              className={`${classes.fileInput} ${
                inputsErr.uploadCv && classes.invalidInput
              }`}
              fileFormat={<FaCloudUploadAlt />}
              fileName={inputs.uploadCv ? "Uploaded" : "Upload Resume"}
            />
            <InputField {...itm} key={index} />
          </div>
        ))}

        {inputsProperties?.slice(7)?.map((itm, i) => (
          <div
            key={i}
            className={`${itm.className} ${
              isSkills && skills.length < 1 && classes.skillsAdded
            }`}
          >
            <Label {...itm.label} />
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
            <div
              className={`${classes.input} ${
                inputsErr[Object.keys(input)[1]] && classes.invalidInput
              }`}
            >
              <input
                type="text"
                placeholder="Answer..."
                name={Object.keys(input)[1]}
                onChange={inputHandler}
                value={inputs[Object.keys(input)[1]]}
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
    </>
  );
};

export default React.memo(FormControl);
