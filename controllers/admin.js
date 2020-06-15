const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  const editMode = req.query.edit;
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: editMode,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(null, title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};

exports.postEditProduct = (req, res, next) => {
  const { prodId, title, imageUrl, price, description } = req.body;
  const updatedProduct = new Product(
    prodId,
    title,
    imageUrl,
    price,
    description
  );
  console.log(updatedProduct);
  updatedProduct.save();
  res.redirect("/admin/products");
};

exports.deleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.delete(productId);
  res.redirect("/admin/products");
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: `/admin/edit-product`,
      editing: editMode,
      product,
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
