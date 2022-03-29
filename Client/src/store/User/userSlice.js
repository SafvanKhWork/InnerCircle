import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../config";

//Add createAsyncThunks

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
  token: window.localStorage.getItem("inner-circle-token").split('"')[1] || "",
};

let authHeader;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initUser: async (state, { payload }) => {
      try {
        state.token = payload ? payload : "";
      } catch (error) {
        console.log(error);
      }
    },
    signIn: async (state, { payload }) => {
      const { credentials, setErrorMessage, setIsLoggedIn, setInProgress } =
        payload;
      try {
        setInProgress(true);
        const response = await axios.post(`${url}/user/login`, credentials);
        const { data } = response;
        if (data) {
          window.localStorage.setItem(
            "inner-circle-token",
            JSON.stringify(data.token)
          );
          const validat = setTimeout(() => {
            setInProgress(false);
            setIsLoggedIn(true);
            return () => {
              clearTimeout(validat);
            };
          }, 1000);
        }
        state.token = data.token;
      } catch (error) {
        const validat = setTimeout(() => {
          setInProgress(false);
          return () => {
            clearTimeout(validat);
          };
        }, 500);
        setErrorMessage(`Provided Email Address or Password is Invalid`);
      }
    },
    refreshUser: async (state) => {
      //Always runs at init
      try {
        let responseStatus;
        authHeader = {
          headers: { Authorization: `Bearer ${state.token}` },
        };
        const account = await (async () => {
          const response = await axios.get(`${url}/user/me`, authHeader);
          responseStatus = response.status;
          if (responseStatus != 200) {
            state.token = "";
          }
          const { data } = response;
          return data;
        })();
        // state = { ...state, ...account };
        state._id = account._id;
        state.name = account.name;
        state.email = account.email;
        state.username = account.username;
        state.avatar = account.avatar;
        state.friendRequest = account.friendRequest;
        state.sentFriendRequest = account.sentFriendRequest;
        state.circle = account.circle;
        state.history = account.history;
        state.recommandation = account.recommandation;

        // dispatch to set History & Recommandation
      } catch (error) {
        console.log(error.message);
      }
    },
    sendFriendRequest: async (state, { payload }) => {
      try {
        const { data } = await axios.post(
          `${url}/add-friend/${payload}`,
          authHeader
        );
        state.friendRequest = data ? data : state.friendRequest;
      } catch (error) {
        console.log(error.message);
      }
    },
    acceptFriendRequest: async (state, { payload }) => {
      try {
        const { data } = await axios.patch(
          `${url}/accept-friend-request/${payload}`,
          authHeader
        );
        state.circle = data ? data : state.circle;
      } catch (error) {
        console.log(error.message);
      }
    },
    unfriendUser: async (state, { payload }) => {
      try {
        const { data } = await axios.delete(
          `${url}/unfriend/${payload}`,
          authHeader
        );
        state.circle = data ? data : state.circle;
      } catch (error) {
        console.log(error.message);
      }
    },
    rejectFriendRequest: async (state, { payload }) => {
      try {
        const { data } = await axios.delete(
          `${url}/reject-friend-request/${payload}`,
          authHeader
        );
        state.friendRequest = data ? data : state.friendRequest;
      } catch (error) {
        console.log(error.message);
      }
    },
    updateAccountDetail: async (state, { payload }) => {
      try {
        const { data } = await axios.patch(
          `${url}/users/me`,
          payload,
          authHeader
        );
        Object.keys(payload).forEach((field) => {
          state[field] = payload[field];
        });
      } catch (error) {
        console.log(error.message);
      }
    },
    refreshHistory: async (state, { payload }) => {
      try {
        const { data } = await axios.get(`${url}/account/history`);
        state.history = data ? data : state.history;
      } catch (error) {
        console.log(error.message);
      }
    },
    logout: async (state, { payload }) => {
      const { setIsLoggedIn } = payload;
      try {
        await axios.post(`${url}/user/logout`, authHeader);
        window.localStorage.setItem("inner-circle-user", JSON.stringify({}));
        state = initialState;
      } catch (error) {}
    },
  },
});

export const {
  initUser,
  signIn,
  refreshUser,
  refreshHistory,
  sendFriendRequest,
  acceptFriendRequest,
  unfriendUser,
  rejectFriendRequest,
  updateAccountDetail,
  logout,
} = userSlice.actions;
export const getUser = (state) => state.user;
export const getToken = (state) => state.user.token;
export default userSlice.reducer;
