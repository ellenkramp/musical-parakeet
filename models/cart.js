const fs = require("fs");
const path = require("path");

const data = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  products = [];
  totalPrice = 0;
  static addProduct(id, price) {
    fs.readFile(data, (err, filecontent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(filecontent);
      }

      const existingProductIndex = cart.products.findIndex((p) => p.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +price;
      fs.writeFile(data, JSON.stringify(cart), (err) => {
        console.log(cart);
        console.log(err);
      });
    });
  }
};
