let url = "http://localhost:3000";
let token =
  JSON.parse(window.localStorage.getItem("inner-circle-token")) || false;

const setToken = (newToken) => {
  token = newToken;
};

export { url, token, setToken };
