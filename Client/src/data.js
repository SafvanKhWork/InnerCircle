let products;
let user =
  JSON.parse(window.localStorage.getItem("inner-circle-user")) || false;
const setGlobelUser = async (value) => {
  user = value;
};
const setProductsList = async (value) => {
  products = value;
};
const sender = async (value) => {
  const t = await setTimeout(() => {
    return () => {
      clearTimeout(t);
    };
  }, 1000);
  return value;
};

function getAccountUser() {
  return user;
}
function getProductList() {
  return products;
}

export { setProductsList, setGlobelUser, getAccountUser, getProductList };
export default products;
