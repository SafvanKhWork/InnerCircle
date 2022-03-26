import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url, token, setToken } from "./config";

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
    refreshUser: async (state) => {
      let responseStatus, payload;
      if (state.token !== false) {
        const config = {
          headers: { Authorization: `Bearer ${state.token}` },
        };
        const getGlobelUser = async () => {
          const response = await axios.get(`${url}/user/me`, config);
          responseStatus = response.status;
          if (responseStatus != 200) {
            setToken(false);
          }
          const { data } = response;
          payload = data;
        };
        await getGlobelUser();
      }

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
