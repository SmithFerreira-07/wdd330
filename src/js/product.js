// W02 bootstrap: get id from URL, create data source & details, init.
import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();

/* Notes:
   - 'Add to Cart' logic lives in ProductDetails.mjs now.
   - We bind 'this' when adding the click handler (see ProductDetails).
*/