import { createSlice } from "@reduxjs/toolkit";

const addParameters = createSlice({
  name: "addParameters",
  initialState: {
    parametersAndDocumentsKeys: "",
  },
  reducers: {
    getParametersFormData(state, actions) {
      const data = actions.payload;
      state.parametersAndDocumentsKeys = data;
    },
  },
});

export const { getParametersFormData } = addParameters.actions;
export default addParameters.reducer;
