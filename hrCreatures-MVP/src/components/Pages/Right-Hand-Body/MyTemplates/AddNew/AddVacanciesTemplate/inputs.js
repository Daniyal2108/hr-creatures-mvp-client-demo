import classes from "./style.module.css";

const dropdown = [
  {
    className: classes.formControl,
    label: {
      properties: { htmlFor: "department" },
      value: "Selelct Department",
    },
    dropdown: {
      className: classes.input,
      id: "department",
      name: "department",
      selected: "Select Department",
      dropdownData: [],
    },
  },

  {
    className: classes.formControl,
    label: {
      properties: { htmlFor: "education" },
      value: "Selelct Education",
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
      value: "Selelct Experience",
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

  {
    className: classes.formControl,
    label: {
      properties: { htmlFor: "expectedSalary" },
      value: "Expected Salary",
    },
    dropdown: {
      className: classes.input,
      id: "expectedSalary",
      name: "expectedSalary",
      selected: "Select Expected Salary",
      dropdownData: [20000, 30000000, 400000, 25000, 10000],
    },
  },
];

const inputsProps = [
  {
    className: classes.formControl,
    label: {
      value: "Vacancy Name",
      properties: {
        htmlFor: "vacancy-name",
      },
    },
    input: {
      className: classes.input,
      values: {
        type: "text",
        id: "vacancy-name",
        name: "name",
        placeholder: "Enter Vacancy Name",
      },
    },
  },
  {
    className: classes.formControl,
    label: {
      value: "No. Of Vacancies",
      properties: {
        htmlFor: "noOfVacancies",
      },
    },
    input: {
      className: classes.input,
      values: {
        type: "number",
        id: "noOfVacancies",
        name: "noOfVacancies",
        placeholder: 0,
      },
    },
  },
  {
    className: classes.formControl,
    label: {
      value: "Job Description",
      properties: {
        htmlFor: "jobDescription",
      },
    },
    input: {
      className: classes.input,
      values: {
        id: "jobDescription",
        type: "button",
        name: "jobDescription",
        value: "Please Add Job Description",
      },
    },
  },
  {
    className: classes.formControl,
    label: {
      value: "From",
      properties: {
        htmlFor: "from",
      },
    },
    input: {
      className: classes.input,
      values: {
        type: "number",
        name: "salaryRangeFrom",
        placeholder: "0000",
      },
    },
  },
  {
    className: classes.formControl,
    label: {
      value: "To",
      properties: {
        htmlFor: "to",
      },
    },
    input: {
      className: classes.input,
      values: {
        id: "to",
        type: "number",
        name: "salaryRangeTo",
        placeholder: "0000",
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
        type: "date",
        name: "expectedJoiningDate",
      },
    },
  },
];

export { inputsProps, dropdown };
