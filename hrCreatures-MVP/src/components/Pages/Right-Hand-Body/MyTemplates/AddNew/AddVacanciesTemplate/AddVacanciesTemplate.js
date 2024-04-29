import classes from "./style.module.css";
import Header from "../../../../../Layout/Header/Header";
import Container from "../../../../../Layout/Container";
import HomeSection from "../../../../../Layout/HomeSection";
import Card from "../../../../../Layout/Card";
import Label from "../../../../../UI/Label";
import Dropdown from "../../../../../UI/Dropdown";
import InputField from "../../../../../UI/InputField";
import Button from "../../../../../UI/Button";
import { inputsProps, dropdown } from "./inputs";
import { useValidate } from "../../../../../../Custom-hooks/useValidate";
import useFetch from "../../../../../../Custom-hooks/useFetch";
import useDropdownId from "../../../../../../Custom-hooks/use-dropdown-id";
import { useState, useCallback, useEffect } from "react";
import Modal from "../../../../../UI/Modal";
import reactDOM from "react-dom";
import JobDescription from "./JobDescription";
import { useDispatch, useSelector } from "react-redux";
import { getParametersFormData } from "../../../../../../store/slices/Add-Templates/add-questioniare-template";
import { useNavigate } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import { Link } from "react-router-dom";
import Loader from "../../../../../UI/Loader";

const AddVacanciesTemplate = (props) => {
  const userCredentials = useSelector(
    (state) => state.userCredentials.userCredentials
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isJobDescription, setIsJobDescription] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [isJobDesValid, setIsJobDesValid] = useState(false);
  const [{ response, error }, fetchDepartment] = useFetch("department/");
  const [{ response: res, error: err }, postVacancy] =
    useFetch("vacancy-templates/");
  const departmentObject = useDropdownId(response);
  const [ids, setIds] = useState({
    department: {},
  });
  const [skills, setSkills] = useState([]);
  const [selected, setIsSelected] = useState();
  const [isSkills, setIsSkills] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { inputHandler, inputTouched, submit, inputs, inputsErr } = useValidate(
    {
      name: "",
      department: "",
      noOfVacancies: "",
      salaryRangeFrom: "",
      salaryRangeTo: "",
      education: "",
      experience: "",
      expectedJoiningDate: "",
      age: "",
      expectedSalary: "",
    },
    true,
    (data) => {
      setIsSkills(true);
      setIsJobDesValid(true);
      if (
        !data.name ||
        !data.department ||
        !data.noOfVacancies ||
        !data.salaryRangeFrom ||
        !data.salaryRangeTo ||
        !data.education ||
        !data.experience ||
        !data.expectedJoiningDate ||
        !data.age ||
        !data.expectedSalary ||
        skills.length < 1 ||
        !jobDescription
      )
        return;
      setIsLoading(true);
      const updatedVal = {
        ...data,
        department: ids.department,
        jobDescription: jobDescription,
        skills,
      };
      console.log(updatedVal);
      postVacancy({
        method: "POST",
        body: JSON.stringify(updatedVal),
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + userCredentials?.token,
        },
      });
    }
  );

  useEffect(() => {
    if (err) {
      setIsModal(true);
      setIsLoading(false);
    }
  }, [err, setIsModal, setIsLoading]);

  useEffect(() => {
    if (response?.data.length < 1) {
      setIsModal(true);
    }
  }, [response, setIsModal]);

  useEffect(() => {
    if (!response?.data) {
      setIsSelected("Loading...");
      if (error) {
        setIsSelected(error);
      }
    } else if (response?.data.length < 1) {
      setIsSelected("No Department..");
    } else {
      setIsSelected("Select Department..");
    }
  }, [response, error, setIsSelected]);

  useEffect(() => {
    if (res?.data) {
      dispatch(getParametersFormData(res?.data));
      navigate("create-candidate-template/");
    }
  }, [res, dispatch, navigate]);

  useEffect(() => {
    fetchDepartment({
      method: "GET",
      headers: {
        authorization: "Bearer " + userCredentials?.token,
      },
    });
  }, [fetchDepartment, userCredentials]);

  const getIdHandler = useCallback((obj) => {
    const { name, id } = obj;
    setIds((prev) => ({ ...prev, [name]: id }));
  }, []);

  const jobDescriptionHandler = () => {
    setIsJobDescription(true);
  };

  const dropdownProps = dropdown.map((dropdown) => ({
    ...dropdown,
    dropdown: {
      ...dropdown.dropdown,
      style: {
        border: inputsErr[dropdown.dropdown.name] && "solid .2vw red",
      },
      selected:
        dropdown.dropdown.name === "department"
          ? selected
          : dropdown.dropdown.selected,
      onChange: inputHandler,
      value: inputs[dropdown.dropdown.name],
      onId: getIdHandler,
      id:
        dropdown.dropdown.name === "department"
          ? departmentObject
            ? departmentObject.filter(
                (item) => item.name === inputs[dropdown.dropdown.name]
              )
            : dropdown.dropdown.id
          : dropdown.dropdown.id,
      dropdownData:
        dropdown.dropdown.name === "department"
          ? departmentObject
            ? departmentObject
            : dropdown.dropdown.dropdownData
          : dropdown.dropdown.dropdownData,
    },
  }));

  const inputProperties = inputsProps.map((prop) => ({
    ...prop,
    input: {
      ...prop.input,
      className: `${classes.input} ${
        inputsErr[prop.input.values.name] && classes.invalidInput
      } ${prop.input.values.type === "button" && classes.addDescriptionBtn} ${
        prop.input.values.type === "button"
          ? jobDescription
            ? classes.descriptionAdded
            : ""
          : ""
      } ${
        prop.input.values.type === "button"
          ? isJobDesValid && !jobDescription && classes.descriptionInvalid
          : ""
      }`,
      values: {
        ...prop.input.values,
        style: prop.input.values.type === "button" ? { cursor: "pointer" } : {},
        onClick:
          prop.input.values.type === "button"
            ? jobDescriptionHandler
            : () => {},
        onChange: inputHandler,
        onBlur: inputTouched,
        value:
          prop.input.values.type === "button"
            ? jobDescription
              ? "Description Added"
              : prop.input.values.value
            : inputs[prop.input.values.name],
        className: classes.inputTag,
      },
    },
  }));

  const modalDescriptionHelper = (
    <Modal
      className={classes.modal}
      children={
        <JobDescription
          onIsJobDescription={() => {
            setIsJobDescription(false);
          }}
          onDescription={(data) => {
            setJobDescription(data);
          }}
        />
      }
      onBackdrop={() => {
        setIsJobDescription(false);
      }}
    />
  );

  const modalHelper = reactDOM.createPortal(
    <Modal
      onBackdrop={() => response?.data.length >= 1 && setIsModal(false)}
      className={classes.popup}
      btn={
        err ? (
          <Button
            className={classes.closeBtn}
            text="Close"
            onClick={() => {
              setIsModal(false);
            }}
          />
        ) : (
          <Link
            to={"/my-vacancies/view-vacancy/departments"}
            className={classes.navigationBtn}
          >
            Go to Add Department.
          </Link>
        )
      }
      children={
        <p className={err && classes.error}>{err || "Add Department first."}</p>
      }
    />,
    document.getElementById("modal")
  );

  const isModalPortal =
    isJobDescription &&
    reactDOM.createPortal(
      modalDescriptionHelper,
      document.getElementById("modal")
    );

  const isPupup =
    isModal &&
    reactDOM.createPortal(modalHelper, document.getElementById("modal"));

  return (
    <HomeSection>
      {isModalPortal}
      {isPupup}
      <Container className={`${classes.rightBodyContainer} !block`}>
        <Header
          headerContent={{
            title: "Add Vacancies Template",
          }}
        />

        <Card className={classes.content}>
          <form onSubmit={submit} className={classes.form}>
            {isLoading && <Loader className={classes.loader} />}
            {inputProperties.slice(0, 1).map((itm, index) => (
              <InputField key={index} {...itm} />
            ))}

            {dropdownProps.slice(0, 1).map((dropdownProps, i) => (
              <div key={i} className={classes.formControl}>
                <Label
                  {...dropdownProps.label}
                  key={dropdownProps.label.value}
                />
                <Dropdown {...dropdownProps.dropdown} key={i} />
              </div>
            ))}

            {inputProperties.slice(1, 5).map((itm, index) => (
              <InputField key={index} {...itm} />
            ))}

            {dropdownProps.slice(1, 3).map((dropdownProps, i) => (
              <div key={i} className={classes.formControl}>
                <Label
                  {...dropdownProps.label}
                  key={dropdownProps.label.value}
                />
                <Dropdown {...dropdownProps.dropdown} key={i} />
              </div>
            ))}

            {inputProperties.slice(5).map((itm, index) => (
              <InputField key={index} {...itm} />
            ))}

            {dropdownProps.slice(3).map((dropdownProps, i) => (
              <div key={i} className={classes.formControl}>
                <Label
                  {...dropdownProps.label}
                  key={dropdownProps.label.value}
                />
                <Dropdown {...dropdownProps.dropdown} key={i} />
              </div>
            ))}

            <div
              className={`${classes.tagsInputContainer} ${
                isSkills && skills.length < 1 && classes.skillsAdded
              }`}
            >
              <Label value="Skills" properties={{ htmlFor: "skills" }} />
              <TagsInput
                value={skills}
                onChange={setSkills}
                name="skills"
                placeHolder="Enter Skills"
              />
            </div>

            <Button
              className={classes.btn}
              text="Continue"
              btnImg=""
              alt="btn-icon"
            />
          </form>
        </Card>
      </Container>
    </HomeSection>
  );
};

export default AddVacanciesTemplate;
