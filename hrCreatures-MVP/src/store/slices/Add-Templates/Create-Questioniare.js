import { createSlice } from "@reduxjs/toolkit";

const createQuestioniare = createSlice({
  name: "createQuestioniare",
  initialState: {
    timeAllowed: {},
    questions: [],
  },
  reducers: {
    getTimeAllowed(state, actions) {
      const timeAllowedData = actions.payload;
      state.timeAllowed = timeAllowedData;
    },
    getQuestioniare(state, actions) {
      const data = actions.payload;
      state.questions = data;
    },
  },
});

export const { getQuestioniare, getTimeAllowed } = createQuestioniare.actions;
export default createQuestioniare.reducer;
