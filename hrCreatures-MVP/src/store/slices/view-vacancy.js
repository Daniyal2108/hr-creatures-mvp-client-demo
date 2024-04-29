import { createSlice } from "@reduxjs/toolkit";

const viewVacancySlice = createSlice({
  name: "view-vacancy",
  initialState: {
    vacancyId: "",
  },
  reducers: {
    getViewVacancyId(state, action) {
      const id = action.payload;
      state.vacancyId = id;
    },
  },
});

export const { getViewVacancyId } = viewVacancySlice.actions;
export default viewVacancySlice.reducer;
