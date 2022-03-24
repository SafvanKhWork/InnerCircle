let url = "http://localhost:3000";
let token =
  JSON.parse(window.localStorage.getItem("inner-circle-token")) || false;

export { url, token };
