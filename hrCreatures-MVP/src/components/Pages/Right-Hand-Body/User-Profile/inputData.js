import { BsFillCameraFill } from "react-icons/bs";
import classes from "./style.module.css";

export const inputFieldsData = [
  {
    className: classes.photoInput,
    input: {
      values: {
        type: "file",
        name: "photo",
        id: "photo",
        accept: "image/*",
        className: classes.photo,
      },
    },
  },
  {
    className: classes.formInput,
    label: {
      properties: { htmlFor: "fName" },
      value: "First Name",
    },
    input: {
      values: {
        type: "text",
        name: "firstName",
        placeholder: "Enter First Name",
        id: "fname",
      },
    },
  },
  {
    className: classes.formInput,
    label: {
      properties: { htmlFor: "lName" },
      value: "Last Name",
    },
    input: {
      values: {
        type: "text",
        name: "lastName",
        placeholder: "Enter Last Name",
        id: "lname",
      },
    },
  },
  {
    className: classes.formInput,
    label: {
      properties: { htmlFor: "designation" },
      value: "Designation",
    },
    input: {
      values: {
        type: "text",
        name: "designation",
        placeholder: "Enter Designation Here",
        id: "designation",
      },
    },
  },
  {
    className: classes.formInput,
    label: {
      properties: { htmlFor: "companyWebsite" },
      value: "Company Website",
    },
    input: {
      values: {
        type: "url",
        name: "companyWebsite",
        placeholder: "Enter Company Website Here",
        id: "companyWebsite",
      },
    },
  },
  {
    className: classes.formInput,
    label: {
      properties: { htmlFor: "contactNo" },
      value: "Contact No",
    },
    input: {
      values: {
        type: "number",
        name: "contactNo",
        placeholder: "Enter Contact No Here",
        id: "contactNo",
      },
    },
  },
  {
    className: classes.formInput,
    label: {
      properties: { htmlFor: "city" },
      value: "City",
    },
    input: {
      values: {
        type: "text",
        name: "city",
        placeholder: "Enter City Here",
        id: "city",
      },
    },
  },
];

export const passwordInputs = [
  {
    className: classes.photoInput,
    input: {
      values: {
        type: "file",
        name: "photo",
        id: "photo",
        accept: "image/*",
        className: classes.photo,
      },
    },
  },
  {
    className: classes.formInput,
    label: {
      properties: { htmlFor: "current-pass" },
      value: "Current Password",
    },
    input: {
      values: {
        type: "password",
        name: "passwordCurrent",
        placeholder: "Enter Current Password Here",
        id: "current-pass",
      },
    },
  },
  {
    className: classes.formInput,
    label: {
      properties: { htmlFor: "pass" },
      value: "New Password",
    },
    input: {
      values: {
        type: "password",
        name: "password",
        placeholder: "Enter New Password Here",
        id: "pass",
      },
    },
  },
  {
    className: classes.formInput,
    label: {
      properties: { htmlFor: "confirm-pass" },
      value: "Confirm New Password",
    },
    input: {
      values: {
        type: "password",
        name: "passwordConfirm",
        placeholder: "Confirm New Password Here",
        id: "confirm-pass",
      },
    },
  },
];
