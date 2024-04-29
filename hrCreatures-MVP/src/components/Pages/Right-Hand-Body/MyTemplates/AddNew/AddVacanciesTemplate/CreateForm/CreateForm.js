import classes from "./style.module.css";
import Header from "../../../../../../Layout/Header/Header";
import Container from "../../../../../../Layout/Container";
import HomeSection from "../../../../../../Layout/HomeSection";
import Card from "../../../../../../Layout/Card";
import Label from "../../../../../../UI/Label";
import Dropdown from "../../../../../../UI/Dropdown";
import InputField from "../../../../../../UI/InputField";
import Button from "../../../../../../UI/Button";
import { inputsProps, dropdown } from "./inputs";
import useFetch from "../../../../../../../Custom-hooks/useFetch";
import { useState, useEffect } from "react";
import Modal from "../../../../../../UI/Modal";
import reactDOM from "react-dom";
import FileBar from "../../../../../../Widgets/FileBar";
import { useSelector } from "react-redux";
import { FaCheck, FaCloudUploadAlt } from "react-icons/fa";
import Loader from "../../../../../../UI/Loader";
import { Link } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";

const CreateForm = (props) => {
  const [isModal, setIsModal] = useState(false);
  const userCredentials = useSelector(
    (state) => state.userCredentials.userCredentials
  );
  const paramData = useSelector(
    (state) => state.parametersForm.parametersAndDocumentsKeys
  );
  const [{ response, error }, postVacancyForm] = useFetch(
    `vacancy-templates/${paramData?._id}`
  );
  const [dynamicInputs, setDynamicInputs] = useState([]);
  const [candidateForm, setCandidateForm] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (candidateForm.length > 1) {
      setIsLoading(true);
      postVacancyForm({
        method: "PATCH",
        body: JSON.stringify({
          candidateForm: candidateForm,
          status: "Active",
        }),
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + userCredentials?.token,
        },
      });
    }
  }, [postVacancyForm, candidateForm, userCredentials, setIsLoading]);

  useEffect(() => {
    if (response?.data || error) {
      setIsModal(true);
      setIsLoading(false);
    }
  }, [response, error, setIsLoading, setIsModal]);

  const labelEditableHandler = (e) => {
    const indexId = e.target.id;

    setDynamicInputs((labelList) => {
      const labelObject = labelList[indexId];
      const updatedObj = { ...labelObject };
      updatedObj[`label${indexId}`] = e.target.innerHTML;
      labelList[indexId] = updatedObj;
      const updatedList = [...labelList];
      return updatedList;
    });
  };

  const addFieldsHandler = () => {
    setDynamicInputs((inputs) => {
      const add = [...inputs, {}];
      const uniqueInputs = add.map((input, i) => {
        const labelName = `label${i}`;
        const inputName = `input${i}`;
        return {
          ...input,
          [labelName]: input[labelName] || "Write Label Here.",
          [inputName]: input[inputName] || "",
        };
      });
      return uniqueInputs;
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setCandidateForm((prev) => [
      ...prev,
      [...inputsProps],
      [...dropdown],
      [...dynamicInputs],
    ]);
  };

  const modalHelper = reactDOM.createPortal(
    <Modal
      onBackdrop={() => setIsModal(false)}
      className={classes.modal}
      icon={<FaCheck />}
      children={
        <p className={error && classes.error}>
          {error || "Template Added Successfully !"}
        </p>
      }
      btn={
        error ? (
          <Button text="Close" onClick={() => setIsModal(false)} />
        ) : (
          <Link className={classes.modalLink} to={"/my-templates/add-new/"}>
            Close
          </Link>
        )
      }
    />,
    document.getElementById("modal")
  );

  return (
    <HomeSection>
      {isModal && modalHelper}
      <Container className={`${classes.rightBodyContainer} !block`}>
        <Header
          headerContent={{
            title: "Add Vacancies Template",
          }}
        />

        <Card className={classes.content}>
          <form onSubmit={submitHandler} className={classes.form}>
            {isLoading && <Loader className={classes.loader} />}
            {inputsProps.slice(0, 4).map((itm, index) => (
              <InputField key={index} {...itm} />
            ))}

            {dropdown.slice(0, 1).map((dropdownProps, i) => (
              <div key={i} className={classes.formControl}>
                <Label
                  {...dropdownProps.label}
                  key={dropdownProps.label.value}
                />
                <Dropdown {...dropdownProps.dropdown} key={i} />
              </div>
            ))}

            {inputsProps.slice(4, 5).map((itm, index) => (
              <InputField key={index} {...itm} />
            ))}

            {dropdown.slice(1, 3).map((dropdownProps, i) => (
              <div key={i} className={classes.formControl}>
                <Label
                  {...dropdownProps.label}
                  key={dropdownProps.label.value}
                />
                <Dropdown {...dropdownProps.dropdown} key={i} />
              </div>
            ))}

            {inputsProps.slice(5, 6).map((itm, index) => (
              <div className={`relative ${classes.file}`} key={index}>
                <InputField {...itm} key={index} />
              </div>
            ))}

            {inputsProps.slice(6, 7).map((itm, index) => (
              <div className={`relative ${classes.file}`} key={index}>
                <FileBar
                  className={classes.fileInput}
                  fileFormat={<FaCloudUploadAlt />}
                  fileName="Upload Resume"
                />
                <InputField {...itm} key={index} />
              </div>
            ))}

            {inputsProps.slice(7).map((itm, i) => (
              <div key={i} className={itm.className}>
                <Label {...itm.label} />
                <TagsInput
                  value={skills}
                  onChange={setSkills}
                  name="skills"
                  placeHolder="Enter Skills"
                />
              </div>
            ))}

            {dynamicInputs.map((input, i) => (
              <div key={i} className={classes.formControl}>
                <label
                  htmlFor={input[`label${i}`]}
                  key={i}
                  id={i}
                  onBlur={labelEditableHandler}
                  contentEditable
                  dangerouslySetInnerHTML={{ __html: input[`label${i}`] }}
                />
                <div className={classes.input}>
                  <input
                    type="text"
                    placeholder="Answer..."
                    name={input[`input${i}`]}
                  />
                </div>
              </div>
            ))}

            <Button
              onClick={addFieldsHandler}
              className={classes.addFieldsBtn}
              text="Add Fields"
              type="button"
            />

            <Button
              className={classes.btn}
              text="Save Template"
              btnImg=""
              alt="btn-icon"
            />
          </form>
        </Card>
      </Container>
    </HomeSection>
  );
};

export default CreateForm;
