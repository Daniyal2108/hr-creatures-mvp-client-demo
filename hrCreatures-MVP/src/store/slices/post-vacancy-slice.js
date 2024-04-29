import { createSlice } from "@reduxjs/toolkit";

const postVacancy = createSlice({
  name: "post-vacancy",
  initialState: {
    vacancyId: "",
    repostVacancy: null,
  },
  reducers: {
    getPostedId(state, actions) {
      const id = actions.payload;
      state.vacancyId = id;
    },
    repostVacancy(state, actions) {
      const vacancy = actions.payload;
      state.repostVacancy = vacancy;
    },
  },
});

export const { getPostedId, repostVacancy } = postVacancy.actions;
export default postVacancy.reducer;
