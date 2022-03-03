import Products from "../components/Product/Products";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const Feed = (props) => {
  return <Products products={props.products} />;
};
export default Feed;
