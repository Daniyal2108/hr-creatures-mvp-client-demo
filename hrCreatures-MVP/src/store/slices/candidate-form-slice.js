import { createSlice } from "@reduxjs/toolkit";

const candidateForm = createSlice({
  name: "candidate-form",
  initialState: {
    vacancyId: "",
    vacancyPostedId: "",
    vacancyPosted: null,
  },
  reducers: {
    getVacancyId(state, actions) {
      const id = actions.payload;
      state.vacancyId = id;
    },
    getVacancyResponseId(state, actions) {
      const id = actions.payload;
      state.vacancyPostedId = id;
    },
    vacancyPosted(state, actions) {
      const postedData = actions.payload;
      state.vacancyPosted = postedData;
    },
  },
});

export const { getVacancyId, getVacancyResponseId, vacancyPosted } =
  candidateForm.actions;
export default candidateForm.reducer;
