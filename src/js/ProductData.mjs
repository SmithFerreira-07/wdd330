// /src/js/ProductData.mjs
// Shared data access for product categories

export default class ProductData {
  constructor(category) {
    this.category = category;
    // Serve JSON from the site root so it works on every page location.
    this.path = `/json/${this.category}.json`;
  }

  getData() {
    return fetch(this.path)
      .then((response) => response.json())
      .then((data) => data);
  }

  async findProductById(id) {
    const data = await this.getData();
    return data.find((item) => item.Id === id);
  }
}