import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  existingUser: true,
  verifiedEmail: false,
  forgotPassword: false,
};

const applicationStateSlice = createSlice({
  name: "applicationState",
  initialState,
  reducers: {
    login: (state, action) => (state.loggedIn = true),
    logout: (state, action) => (state.loggedIn = false),
    createAccount: (state, action) => (state.existingUser = false),
    accountCreated: (state, action) => {
      state.loggedIn = true;
      state.existingUser = true;
    },
    hasAccount: (state, action) => (state.existingUser = false),
    forgotPassword: (state, action) => (state.forgotPassword = true),
    hasPassword: (state, action) => (state.forgotPassword = false),
  },
});

export const {
  login,
  logout,
  createAccount,
  accountCreated,
  hasAccount,
  forgotPassword,
  hasPassword,
} = applicationStateSlice.actions;
export default applicationStateSlice.reducer;
