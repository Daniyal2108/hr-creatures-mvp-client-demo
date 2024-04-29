import { createSlice } from "@reduxjs/toolkit";

const viewVacancyTemplate = createSlice({
  name: "viewVacancyTemplateData",
  initialState: {
    viewVacancyTemplateData: null,
  },
  reducers: {
    viewVacancyTemplateData(state, actions) {
      const vacancyTemplateData = actions.payload;
      state.viewVacancyTemplateData = vacancyTemplateData;
    },
  },
});

export const { viewVacancyTemplateData } = viewVacancyTemplate.actions;
export default viewVacancyTemplate.reducer;
