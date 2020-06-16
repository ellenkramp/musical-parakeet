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
  Product.create({
    title,
    imageUrl,
    price,
    description,
  })
    .then(() => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const { prodId, title, imageUrl, price, description } = req.body;
  Product.findByPk(prodId)
    .then((product) => {
      Object.assign(product, { title, imageUrl, price, description });
      return product.save();
    })
    .then((result) => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.findByPk(productId)
    .then((product) => product.destroy({ productId }))
    .then(() => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId).then((product) => {
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
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};
