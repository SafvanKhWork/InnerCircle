import axios from "axios";
import { url, token } from "./config";

let products;
let user;
const setGlobelUser = async (value) => {
  user = value;
};
const setProducts = async (value) => {
  user = value;
};

export { setProducts, setGlobelUser };
export default products;
