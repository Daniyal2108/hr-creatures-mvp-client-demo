import classes from "./style.module.css";

const dropdown = [
  {
    className: classes.formControl,
    label: {
      properties: { htmlFor: "vacancyTemplates" },
      value: "Vacancy Templates",
    },
    dropdown: {
      className: classes.input,
      id: "vacancyTemplates",
      name: "vacancyTemplate",
      selected: "Select Vacancy Template",
      dropdownData: [],
    },
  },
];

const inputsProps = [
  {
    className: classes.formControl,
    label: {
      value: "Last Date Of Apply",
      properties: {
        htmlFor: "last-date-of-apply",
      },
    },
    input: {
      values: {
        className: classes.input,
        type: "date",
        id: "last-date-of-apply",
        name: "lastDateOfApply",
      },
    },
  },
  {
    className: classes.formControl,
    label: {
      value: "Joining Date",
      properties: {
        htmlFor: "joining-date",
      },
    },
    input: {
      values: {
        className: classes.input,
        type: "date",
        id: "joining-date",
        name: "joiningDate",
      },
    },
  },
  {
    className: classes.formControlCheckbox,
    label: {
      value: "Education",
      properties: {
        htmlFor: "",
      },
    },
    input: {
      values: {
        type: "checkbox",
        name: "education",
        value: "education",
      },
    },
  },
  {
    className: classes.formControlCheckbox,
    label: {
      value: "Experience",
      properties: {
        htmlFor: "",
      },
    },
    input: {
      values: {
        type: "checkbox",
        name: "experience",
        value: "experience",
      },
    },
  },
  {
    className: classes.formControlCheckbox,
    label: {
      value: "Expected Joining Date",
      properties: {
        htmlFor: "",
      },
    },
    input: {
      values: {
        type: "checkbox",
        name: "expectedJoiningDate",
        value: "expectedJoiningDate",
      },
    },
  },
  {
    className: classes.formControlCheckbox,
    label: {
      value: "Age",
      properties: {
        htmlFor: "",
      },
    },
    input: {
      values: {
        type: "checkbox",
        name: "age",
        value: "age",
      },
    },
  },
  {
    className: classes.formControlCheckbox,
    label: {
      value: "Expected Salary",
      properties: {
        htmlFor: "",
      },
    },
    input: {
      values: {
        type: "checkbox",
        name: "expectedSalary",
        value: "expectedSalary",
      },
    },
  },
  {
    className: classes.formControlCheckbox,
    label: {
      value: "Skills",
      properties: {
        htmlFor: "",
      },
    },
    input: {
      values: {
        type: "checkbox",
        name: "skills",
        value: "skills",
      },
    },
  },
];

export { inputsProps, dropdown };
