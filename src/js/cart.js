import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const list = document.querySelector("#cart-items");
  if (!list) return; // guard so we never crash

  if (!cartItems.length) {
    list.innerHTML = "<li>Your cart is empty.</li>";
    return;
  }

  list.innerHTML = cartItems
    .map((item) => {
      const name = item.Name || item.NameWithoutBrand || "Product";
      const image = item.Image || (item.Images && item.Images[0]) || "";
      const price = Number(
        item.FinalPrice ?? item.ListPrice ?? item.Price ?? 0
      ).toFixed(2);
      return `
        <li class="cart-card">
          <img class="cart-card__image" src="${image}" alt="${name}" />
          <p class="card__name">${name}</p>
          <p class="cart-card__price">$${price}</p>
        </li>
      `;
    })
    .join("");
}

// Extra-safe: run after DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderCartContents);
} else {
  renderCartContents();
}