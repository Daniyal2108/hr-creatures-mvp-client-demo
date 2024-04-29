import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    auth: null,
    userInput: null,
    user: null,
    isUserInputSubmitted: null,
    incorrectUser: null,
    loader: false,
  },
  reducers: {
    getUserInput(state, actions) {
      const userInputValues = actions.payload;
      state.loader = true;
      state.userInput = userInputValues;
      state.isUserInputSubmitted = true;
    },
    login(state, actions) {
      const data = actions.payload;

      if (data?.token) {
        state.auth = true;
        state.isUserInputSubmitted = null;
        state.user = data;
        state.incorrectUser = null;
      } else {
        state.auth = null;
        state.isUserInputSubmitted = false;
        state.incorrectUser = data;
      }
      state.loader = false;
    },
    signUp(state) {
      state.loader = false;
    },
    logout(state) {
      state.auth = false;
      state.isUserInputSubmitted = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
