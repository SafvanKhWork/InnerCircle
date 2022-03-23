import axios from "axios";
import { url, setToken } from "./config";

export let user =
  JSON.parse(window.localStorage.getItem("inner-circle-user")) || false;

let products;
(async () => {
  const { data } = await axios.get(`${url}/products`);
  products = data;
})();

setToken(user.token);

export default products;
