import axios from "axios";
import { url, token, setToken } from "./config";

let products;
let user =
  JSON.parse(window.localStorage.getItem("inner-circle-user")) || false;

const setGlobelUser = async (value) => {
  user = value;
};
const setProductsList = async (value) => {
  products = value;
};

export { products, user, setGlobelUser, setProductsList };
export default products;


// FETCH REQUESTS

const refresh = async (setUser) => {
  let tempUser;
  if (token !== false) {
    let responseStatus;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const getGlobelUser = async () => {
      const response = await axios.get(`${url}/user/me`, config);
      responseStatus = response.status;
      if (responseStatus != 200) {
        setToken(false);
        tempUser = false;
      }
      const { data } = response;
      tempUser = data;
    };
    await getGlobelUser();
    console.log(token, user, responseStatus);
  }
  (async () => {
    const { data } = await axios.get(`${url}/products`);
    //products = data;
  })();
};

//