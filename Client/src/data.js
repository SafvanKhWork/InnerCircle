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
