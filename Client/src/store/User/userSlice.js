import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  email: "",
  username: "",
  avatar: "",
  friendRequest: [],
  sentFriendRequest: [],
  circle: [],
  history: [],
  recommandation: [],
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, { payload }) => {
      state.token = payload;
    },
    refreshUser: (state, { payload }) => {
      state._id = payload._id;
      state.name = payload.name;
      state.email = payload.email;
      state.username = payload.username;
      state.avatar = payload.avatar;
      state.friendRequest = payload.friendRequest;
      state.sentFriendRequest = payload.sentFriendRequest;
      state.circle = payload.circle;
      state.history = payload.history;
      state.recommandation = payload.recommandation;
    },
    refreshUserField: (state, { payload }) => {
      Object.keys(payload).forEach((field) => {
        state[field] = payload[field];
      });
    },
    logout: (state, action) => {
      state = initialState;
    },
  },
});

export const { signIn, logout, refreshUser, refreshUserField } =
  userSlice.actions;
export default userSlice.reducer;
