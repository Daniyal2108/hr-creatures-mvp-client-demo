import React from "react";
import classes from "./style.module.css";
import { useSelector } from "react-redux";
import userImg from "../../../../images/user.png";
import {
  AiOutlineUserAdd,
  AiOutlineArrowRight,
  AiTwotoneLock,
  AiFillCamera,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { useState } from "react";
import { inputFieldsData, passwordInputs } from "./inputData";
import Button from "../../../UI/Button";
import Input from "../../../UI/Input";
import InputField from "../../../UI/InputField";
import { useValidate } from "../../../../Custom-hooks/useValidate";
import useFetch from "../../../../Custom-hooks/useFetch";
import { useDispatch } from "react-redux";
import { authActions } from "../../../../store/slices/auth-slice";
import { userCredentialsActions } from "../../../../store/slices/userCredentials-slice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../UI/Loader";
import reactDOM from "react-dom";
import Modal from "../../../UI/Modal";

const EditDetailsForm = ({ getUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userCredentials = useSelector(
    (state) => state.userCredentials.userCredentials
  );
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [{ response, error }, updateUser] = useFetch(
    (user === "details" && "users/updateMe") ||
      (user === "change-pass" && "users/updateMyPassword")
  );
  const { inputHandler, submit, inputs } = useValidate(
    {
      ...getUser,
      passwordCurrent: "",
      password: "",
      passwordConfirm: "",
    },
    false,
    (data) => {
      setIsLoading(true);
      const submittedData = {
        ...data,
      };

      const {
        photo,
        firstName,
        lastName,
        designation,
        companyWebsite,
        contactNo,
        city,
        passwordCurrent,
        password,
        passwordConfirm,
      } = submittedData;
      const file = Array.isArray(photo)
        ? photo[0]
        : photo.split("/")[photo.split("/").length - 1];

      let inputData = {
        photo: file,
        firstName,
        lastName,
        designation,
        companyWebsite,
        contactNo,
        city,
      };

      let passwordData = {
        passwordCurrent,
        password,
        passwordConfirm,
      };

      const formData = new FormData();
      for (let key in inputData) {
        formData.append(key, inputData[key]);
      }
      updateUser(
        (user === "details" && {
          method: "PATCH",
          body: formData,
          headers: {
            authorization: "Bearer " + userCredentials?.token,
          },
        }) ||
          (user === "change-pass" && {
            method: "PATCH",
            body: JSON.stringify(passwordData),
            headers: {
              "content-type": "application/json",
              authorization: "Bearer " + userCredentials?.token,
            },
          })
      );
    }
  );
  console.log(getUser);

  useEffect(() => {
    if (response?.data) {
      setIsLoading(false);
      setIsModal(true);
    }
  }, [response, setIsModal]);

  useEffect(() => {
    if (user === "change-pass" && response?.token) {
      navigate("/");
      dispatch(authActions.logout());
      dispatch(
        userCredentialsActions.userCredentialsReducer(localStorage.clear())
      );
      setIsLoading(false);
    }
  }, [response, user, dispatch, navigate, setIsLoading]);

  const inputProps = inputFieldsData.map((input) => ({
    ...input,
    input: {
      ...input.input,
      values: {
        ...input.input.values,
        value: inputs[input.input.values.name],
        onChange: inputHandler,
      },
    },
  }));

  const passInputs = passwordInputs.map((input) => ({
    ...input,
    input: {
      ...input.input,
      values: {
        ...input.input.values,
        value: inputs[input.input.values.name],
        onChange: inputHandler,
      },
    },
  }));

  const backToProfileHandler = () => {
    setUser("");
  };

  const tabHandler = (e) => {
    const id = e.target.id;

    setUser(id);
  };

  const modalHelper = reactDOM.createPortal(
    <Modal
      onBackdrop={() => setIsModal(false)}
      className={classes.modal}
      btn={
        <Button
          text="Close"
          onClick={() => {
            setIsModal(false);
            setUser("");
          }}
        />
      }
      children={
        <p className={error && classes.error}>{error || "User Updated !"}</p>
      }
    />,
    document.getElementById("modal")
  );

  return (
    <div className={`${classes.formContainer}`}>
      {isModal && modalHelper}
      {(user === "details" || user === "change-pass") && (
        <AiOutlineArrowLeft
          onClick={backToProfileHandler}
          className={classes.backArrow}
        />
      )}

      <form onSubmit={submit}>
        {isLoading && <Loader className={classes.loader} />}
        <div
          className={`${classes.imageContainer} ${classes.imageContainerOnEditDetails} `}
        >
          <div className={classes.imageContainerContent}>
            <img
              src={
                (getUser?.photo &&
                  `https://hr-management-development.s3.eu-west-2.amazonaws.com/${getUser?.photo}`) ||
                userImg
              }
              alt="user-profile"
            />

            {(user === "details" || user === "change-pass") && (
              <>
                <Input
                  className={classes.photo}
                  values={{
                    type: "file",
                    name: "photo",
                    onChange: inputHandler,
                    accept: "image/*",
                    className: classes.photo,
                  }}
                />

                <div className={classes.cameraIcon}>
                  <AiFillCamera />
                </div>
              </>
            )}
          </div>
        </div>

        {user !== "" && (
          <div className={classes.form}>
            {user === "details" &&
              inputProps
                .slice(1)
                .map((input, i) => <InputField key={i} {...input} />)}
            {user === "change-pass" &&
              passInputs
                .slice(1)
                .map((input, i) => <InputField key={i} {...input} />)}
          </div>
        )}

        {user === "" && (
          <h1 className="capitalize text-center">
            {getUser?.firstName + " " + getUser?.lastName}
          </h1>
        )}

        {user === "" && (
          <div className={classes.tab} onClick={tabHandler} id="details">
            <AiOutlineUserAdd className="text-indigo-700" />
            <h3>My Details</h3>
            <AiOutlineArrowRight />
          </div>
        )}

        {user === "" && (
          <div className={classes.tab} onClick={tabHandler} id="change-pass">
            <AiTwotoneLock className="text-indigo-700" />
            <h3>Change Password</h3>
            <AiOutlineArrowRight />
          </div>
        )}

        {(user === "details" || user === "change-pass") && (
          <Button text="Update" className={classes.updateBtn} />
        )}
      </form>
    </div>
  );
};

export default EditDetailsForm;
