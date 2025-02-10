import express from "express";
import {
  addToCart,
  deleteCartItem,
  fetchCartItem,
  updateCartItemQuantity,
} from "../../controller/shop/cart-controller.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItem);
router.put("/update-cart", updateCartItemQuantity);
router.delete("/:userId/:productId", deleteCartItem);

export default router;
