import { qs, getLocalStorage, setLocalStorage } from "./utils.mjs";

// Normalize any image path to an absolute /images/... URL
function toImageSrc(path) {
  if (!path) return "";
  const clean = path.replace(/^(\.\.\/)+/, "");
  return clean.startsWith("/") ? clean : `/${clean}`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = null;
    this.dataSource = dataSource;
    this.containerSelector = "#product-detail";
  }

  async init() {
    const container = qs(this.containerSelector);
    if (!container) return;

    if (!this.productId) {
      container.innerHTML = `<p class="alert">No product specified.</p>`;
      return;
    }

    try {
      this.product = await this.dataSource.findProductById(this.productId);
      if (!this.product) {
        container.innerHTML = `<p class="alert">Product not found.</p>`;
        return;
      }
      this.renderProductDetails();
      const addBtn = document.getElementById("addToCart");
      if (addBtn) addBtn.addEventListener("click", this.addProductToCart.bind(this));
    } catch (err) {
      console.error("Error loading product:", err);
      container.innerHTML = `<p class="alert">There was a problem loading this product.</p>`;
    }
  }

  addProductToCart() {
    try {
      if (!this.product) return;
      let cartItems = getLocalStorage("so-cart");
      if (!Array.isArray(cartItems)) cartItems = cartItems ? [cartItems] : [];
      cartItems.push(this.product);
      setLocalStorage("so-cart", cartItems);
      const addBtn = document.getElementById("addToCart");
      if (addBtn) {
        addBtn.disabled = true;
        addBtn.textContent = "Added!";
        setTimeout(() => {
          addBtn.disabled = false;
          addBtn.textContent = "Add to Cart";
        }, 700);
      }
    } catch (err) {
      console.error("addProductToCart failed:", err);
    }
  }

  renderProductDetails() {
    const p = this.product;
    const container = qs(this.containerSelector);
    if (!p || !container) return;

    const brandName =
      (p.Brand && (p.Brand.Name || p.Brand.BrandName)) || p.Brand || "";
    const price =
      p.FinalPrice ?? p.ListPrice ?? p.SuggestedRetailPrice ?? p.Price ?? 0;
    const rawImg = p.Image || (p.Images && p.Images[0]) || "";
    const imgSrc = toImageSrc(rawImg);
    const name = p.Name || p.NameWithoutBrand || p.Title || "Product";
    const description =
      p.DescriptionHtmlSimple || p.Description || p.LongDescription || "";

    container.innerHTML = `
      <article class="product-detail__wrapper" data-id="${p.Id}">
        <h1 class="product-detail__title">${name}</h1>

        <div class="product-detail__grid">
          <div class="product-detail__media">
            <img class="product-detail__image" src="${imgSrc}" alt="${p.NameWithoutBrand || name}" />
          </div>

          <div class="product-detail__info">
            <p class="product-detail__brand">${brandName}</p>
            <p class="product-detail__price">$${Number(price).toFixed(2)}</p>

            <div class="product-detail__desc">
              ${description}
            </div>

            <div class="product-detail__cta">
              <button id="addToCart" data-id="${p.Id}" class="btn btn--primary" type="button">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }
}