import { createSlice } from "@reduxjs/toolkit";

const userCredentialsSlice = createSlice({
  name: "user-credentials",
  initialState: {
    userCredentials: {},
  },
  reducers: {
    userCredentialsReducer(state, actions) {
      const userCredentials = actions.payload;
      state.userCredentials = userCredentials;
    },
  },
});

export const userCredentialsActions = userCredentialsSlice.actions;
export default userCredentialsSlice.reducer;
