import classes from "./style.module.css";

const dropdown = [
  {
    className: classes.formControl,
    label: {
      properties: { htmlFor: "education" },
      value: "Education",
    },
    dropdown: {
      className: classes.input,
      id: "education",
      name: "education",
      selected: "Select Education",
      dropdownData: ["Matric", "Intermediate", "Bachelor's", "Master's", "PHD"],
    },
  },

  {
    className: classes.formControl,
    label: {
      properties: { htmlFor: "experience" },
      value: "Experience",
    },
    dropdown: {
      className: classes.input,
      id: "experience",
      name: "experience",
      selected: "Select Experience",
      dropdownData: ["1 YEAR", "2 YEAR", "3 YEAR"],
    },
  },

  {
    className: classes.formControl,
    label: {
      properties: { htmlFor: "age" },
      value: "Age",
    },
    dropdown: {
      className: classes.input,
      id: "age",
      name: "age",
      selected: "Select Age",
      dropdownData: [20, 30, 40, 50, 60],
    },
  },
];

const inputsProps = [
  {
    className: classes.formControl,
    label: {
      value: "Full Name",
      properties: {
        htmlFor: "full-name",
      },
    },
    input: {
      className: classes.input,
      values: {
        type: "text",
        id: "full-name",
        name: "fullName",
        placeholder: "Answer...",
      },
    },
  },
  {
    className: classes.formControl,
    label: {
      value: "Email",
      properties: {
        htmlFor: "email",
      },
    },
    input: {
      className: classes.input,
      values: {
        type: "email",
        id: "email",
        name: "email",
        placeholder: "Answer...",
      },
    },
  },

  {
    className: classes.formControl,
    label: {
      value: "Phone",
      properties: {
        htmlFor: "phone",
      },
    },
    input: {
      className: classes.input,
      values: {
        id: "phone",
        type: "number",
        name: "phone",
        placeholder: "Answer...",
      },
    },
  },
  {
    className: classes.formControl,
    label: {
      value: "Additional Education",
      properties: {
        htmlFor: "additionalEducation",
      },
    },
    input: {
      className: classes.input,
      values: {
        id: "additionalEducation",
        type: "text",
        name: "additionalEducation",
        placeholder: "Answer...",
      },
    },
  },
  {
    className: classes.formControl,
    label: {
      value: "Expected Joining Date",
      properties: {
        htmlFor: "expectedJoiningDate",
      },
    },
    input: {
      className: classes.input,
      values: {
        id: "expectedJoiningDate",
        type: "date",
        name: "expectedJoiningDate",
      },
    },
  },
  {
    className: classes.formControl,
    label: {
      value: "Expected Salary",
      properties: {
        htmlFor: "expectedSalary",
      },
    },
    input: {
      className: classes.input,
      values: {
        id: "expectedSalary",
        type: "number",
        name: "expectedSalary",
        placeholder: "Answer...",
      },
    },
  },

  {
    className: classes.formControl,
    label: {
      value: "Upload CV",
      properties: {
        htmlFor: "upload-cv",
      },
    },
    input: {
      className: classes.fileInputTag,
      values: {
        id: "upload-cv",
        type: "file",
        name: "uploadCv",
        placeholder: "Upload File",
      },
    },
  },

  {
    className: classes.tagsInputContainer,
    label: {
      value: "Skills",
      properties: {
        htmlFor: "skills",
      },
    },
    input: {
      values: {
        id: "skills",
        name: "skills",
        placeholder: "Enter Skills",
      },
    },
  },
];

export { inputsProps, dropdown };
