const express = require("express");

const router = express.Router();

const shopController = require("../controllers/shop");

router.get("/products/:productId", shopController.getProductDetail);
router.get("/products", shopController.getProducts);
router.post("/cart", shopController.postCart);
router.get("/cart", shopController.getCart);
router.get("/checkout", shopController.getCheckout);
router.get("/orders", shopController.getOrders);
router.get("/", shopController.getIndex);

module.exports = router;
