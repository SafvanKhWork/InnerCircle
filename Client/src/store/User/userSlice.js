import { createSlice } from "@reduxjs/toolkit";
import { user } from "../../data";

const initialState = {
  user: {},
  token: "",
};

const userSlice = createSlice({
  name: user,
  initialState,
  reducers: {
    signIn: (state, { payload }) => {
      state.token = payload;
    },
    refreshUser: (state, { payload }) => {
      state.user = payload;
    },
    logout: (state, action) => {
      state.token = undefined;
    },
  },
});

export const { signIn, logout, refreshUser } = userSlice.actions;
export default userSlice.reducer;
