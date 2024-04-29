import classes from "./style.module.css";
import Header from "../../../../../../Layout/Header/Header";
import Container from "../../../../../../Layout/Container";
import HomeSection from "../../../../../../Layout/HomeSection";
import Card from "../../../../../../Layout/Card";
import InputField from "../../../../../../UI/InputField";
import Button from "../../../../../../UI/Button";
import { useValidate } from "../../../../../../../Custom-hooks/useValidate";
import { FaArrowRight } from "react-icons/fa";
import useFetch from "../../../../../../../Custom-hooks/useFetch";
import { useSelector } from "react-redux";
import Modal from "../../../../../../UI/Modal";
import reactDOM from "react-dom";
import { FaCheck, FaRegTimesCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../../../UI/Loader";

const AddDepartment = (props) => {
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const userCredentials = useSelector(
    (state) => state.userCredentials.userCredentials
  );
  const [{ response, error }, postDepartment] = useFetch("department/");
  const { inputHandler, inputTouched, submit, inputs } = useValidate(
    {
      name: "",
    },
    false,
    (data) => {
      if (!data.name) return;
      setLoader(true);
      postDepartment({
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
          authorization: "Bearer " + userCredentials?.token,
        },
      });
    }
  );

  useEffect(() => {
    setIsModal(response?.data?._id);
  }, [response, error, setIsModal]);

  useEffect(() => {
    if (response || error) {
      setLoader(false);
    }
  }, [response, error, setLoader]);

  console.log(error);

  const modalHelper = reactDOM.createPortal(
    <Modal
      onBackdrop={() => setIsModal(false)}
      className={classes.modal}
      icon={error ? <FaRegTimesCircle /> : <FaCheck />}
      btn={
        <Button
          text="Close"
          className={classes.modalBtn}
          onClick={() => {
            setIsModal(false);
            navigate("/my-vacancies/view-vacancy/departments");
          }}
        />
      }
      children={<p>{error || "Department Added Successfully !"}</p>}
    />,
    document.getElementById("modal")
  );

  console.log(isModal);

  return (
    <HomeSection>
      {isModal && modalHelper}
      <Container className={`${classes.rightBodyContainer} !block`}>
        <Header
          headerContent={{
            title: "Departments",
          }}
        />

        <Card className={classes.content}>
          {loader && <Loader className={classes.loader} />}
          <form onSubmit={submit}>
            <Card className={classes.formCard}>
              <InputField
                className={classes.input}
                label={{
                  value: "Add Department Name",
                  properties: { htmlFor: "department-name" },
                }}
                input={{
                  values: {
                    type: "text",
                    name: "name",
                    id: "department-name",
                    onChange: inputHandler,
                    onBlur: inputTouched,
                    value: inputs.name,
                    placeholder: "Type...",
                  },
                }}
              />
            </Card>
            <Button
              className={`${classes.saveBtn} flex justify-between items-center flex-row-reverse`}
              text="Save"
              svg={<FaArrowRight />}
            />
          </form>
        </Card>
      </Container>
    </HomeSection>
  );
};

export default AddDepartment;
