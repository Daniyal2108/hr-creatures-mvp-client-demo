import { createSlice } from "@reduxjs/toolkit";

const viewQuestioniareTemplate = createSlice({
  name: "viewQuestioniareTemplateData",
  initialState: {
    viewQuestioniareTemplateData: null,
  },
  reducers: {
    viewQuestioniareTemplateData(state, actions) {
      const questioniareTemplateData = actions.payload;
      state.viewQuestioniareTemplateData = questioniareTemplateData;
    },
  },
});

export const { viewQuestioniareTemplateData } =
  viewQuestioniareTemplate.actions;
export default viewQuestioniareTemplate.reducer;
