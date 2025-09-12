// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  // we build from /src
  root: "src",
  // tell Vite that our public folder lives inside /src (so /src/public/** gets copied to dist)
  publicDir: "public",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        // entry HTML files Vite must build
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        // single dynamic product page (replaces product1..product4)
        product: resolve(__dirname, "src/product_pages/index.html"),
      },
    },
  },
});