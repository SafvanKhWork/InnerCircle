import axios from "axios";
import { url } from "./config";

export let user =
  JSON.parse(window.localStorage.getItem("inner-circle-user")) || false;

let products;
(async () => {
  const { data } = await axios.get(`${url}/products`);
  products = data;
})();

export default products;

//  const { data } = await axios.get(`${url}/products`);
//  console.log(Object.keys(data[0]));
