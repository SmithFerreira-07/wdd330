import { renderListWithTemplate } from "./utils.mjs";

// Normalize any image path to an absolute /images/... URL
function toImageSrc(path) {
  if (!path) return "";
  const clean = path.replace(/^(\.\.\/)+/, "");
  return clean.startsWith("/") ? clean : `/${clean}`;
}

function productCardTemplate(product) {
  const id = product.Id;
  const brand =
    (product.Brand && (product.Brand.Name || product.Brand.BrandName)) ||
    product.Brand ||
    "";
  const name = product.Name || product.NameWithoutBrand || product.Title || "";
  const price =
    product.FinalPrice ??
    product.ListPrice ??
    product.SuggestedRetailPrice ??
    product.Price ??
    0;

  const rawImg = product.Image || (product.Images && product.Images[0]) || "";
  const imgSrc = toImageSrc(rawImg);

  return `<li class="product-card">
    <a href="product_pages/?product=${id}">
      <img src="${imgSrc}" alt="${name}">
      <h3 class="card__brand">${brand}</h3>
      <h2 class="card__name">${name}</h2>
      <p class="product-card__price">$${Number(price).toFixed(2)}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true
    );
  }
}