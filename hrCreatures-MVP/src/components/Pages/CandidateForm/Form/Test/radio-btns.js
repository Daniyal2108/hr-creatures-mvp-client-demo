const radioBtns = [
  {
    input: {
      values: {
        type: "radio",
        value: "New to Old",
        id: "new-to-old",
        name: "employeeFilter",
      },
    },
    label: {
      properties: { htmlFor: "new-to-old" },
      value: "New to old",
    },
  },
  {
    input: {
      values: {
        type: "radio",
        value: "Old to new",
        id: "old-to-new",
        name: "employeeFilter",
      },
    },
    label: {
      properties: { htmlFor: "old-to-new" },
      value: "Old to new",
    },
  },
];

export default radioBtns;
