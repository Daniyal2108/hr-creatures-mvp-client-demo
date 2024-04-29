import classes from "./style.module.css";

const signIn = [
  {
    className: "text-left relative w-full",
    // label: {
    //   properties: { className: classes.inputLabel, htmlFor: "email" },
    //   value: "Username or Email",
    // },
    input: {
      values: {
        className: classes.loginInput,
        name: "email",
        type: "email",
        id: "email",
        placeholder: "Enter username or email",
      },
    },
  },
  {
    className: "text-left relative w-full",
    // label: {
    //   properties: { className: classes.inputLabel, htmlFor: "pass" },
    //   value: "Password",
    // },
    input: {
      values: {
        className: classes.loginInput,
        name: "password",
        id: "pass",
        autoComplete: "new-password",
        placeholder: "Password",
      },
    },
  },
];

const signUp = [
  {
    className: `text-left relative ${classes.firstName}`,
    // label: {
    //   properties: { className: classes.inputLabel, htmlFor: "fName" },
    //   value: "First Name",
    // },
    input: {
      values: {
        className: classes.loginInput,
        name: "fName",
        type: "text",
        id: "fName",
        autoComplete: "false",
        placeholder: "First Name",
      },
    },
  },
  {
    className: `text-left relative ${classes.lastName}`,
    // label: {
    //   properties: { className: classes.inputLabel, htmlFor: "lName" },
    //   value: "Last Name",
    // },
    input: {
      values: {
        className: classes.loginInput,
        name: "lName",
        type: "text",
        id: "lName",
        autoComplete: "false",
        placeholder: "Last Name",
      },
    },
  },
  {
    className: "text-left relative w-full",
    // label: {
    //   properties: { className: classes.inputLabel, htmlFor: "email" },
    //   value: "Official Email",
    // },
    input: {
      values: {
        className: classes.loginInput,
        name: "email",
        type: "email",
        id: "email",
        placeholder: "Enter Official Email",
      },
    },
  },

  {
    className: "text-left relative w-full",
    // label: {
    //   properties: { className: classes.inputLabel, htmlFor: "company" },
    //   value: "Company",
    // },
    input: {
      values: {
        className: classes.loginInput,
        name: "company",
        type: "text",
        id: "company",
        placeholder: "Enter Company Name",
      },
    },
  },
  {
    className: "text-left relative w-full",
    // label: {
    //   properties: { className: classes.inputLabel, htmlFor: "designation" },
    //   value: "Designation",
    // },
    input: {
      values: {
        className: classes.loginInput,
        name: "designation",
        type: "text",
        id: "designation",
        placeholder: "Enter Designation",
      },
    },
  },
  {
    className: "text-left relative w-full",
    // label: {
    //   properties: {
    //     className: classes.inputLabel,
    //     htmlFor: "companyWebsite",
    //   },
    //   value: "Company Website",
    // },
    input: {
      values: {
        className: classes.loginInput,
        name: "companyWebsite",
        type: "url",
        id: "companyWebsite",
        placeholder: "Enter Company Website",
      },
    },
  },
  {
    className: "text-left relative w-full",
    // label: {
    //   properties: {
    //     className: classes.inputLabel,
    //     htmlFor: "contactNo",
    //   },
    //   value: "Contact No",
    // },
    input: {
      values: {
        className: classes.loginInput,
        name: "contactNo",
        type: "tel",
        id: "contactNo",
        placeholder: "Enter Contact No",
      },
    },
  },
  {
    className: "text-left relative w-full",
    // label: {
    //   properties: {
    //     className: classes.inputLabel,
    //     htmlFor: "city",
    //   },
    //   value: "City",
    // },
    input: {
      values: {
        className: classes.loginInput,
        name: "city",
        type: "text",
        id: "city",
        placeholder: "Enter City",
      },
    },
  },
];

const createPassword = [
  {
    className: "text-left relative w-full",
    label: {
      properties: { className: classes.inputLabel, htmlFor: "create-password" },
      value: "Create Password",
    },
    input: {
      values: {
        className: classes.loginInput,
        name: "password",
        id: "create-password",
        placeholder: "Create your password",
      },
    },
  },
  {
    className: "text-left relative w-full",
    label: {
      properties: { className: classes.inputLabel, htmlFor: "cPass" },
      value: "Password",
    },
    input: {
      values: {
        className: classes.loginInput,
        name: "passwordConfirm",
        id: "cPass",
        autoComplete: "new-password",
        placeholder: "Confirm Password",
      },
    },
  },
];

export { signIn, signUp, createPassword };
