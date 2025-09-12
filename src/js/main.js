// /src/js/main.js
// W02 Individual: Dynamic Product List on the home page

import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const listElement = document.querySelector(".product-list"); // <ul class="product-list">
const dataSource = new ProductData("tents"); // current category JSON

const productList = new ProductList("tents", dataSource, listElement);
productList.init();