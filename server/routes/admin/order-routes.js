import express from "express";
import {
  getAllOrdersOfAllUser,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "../../controller/admin/order-controller.js";

const router = express.Router();

router.get("/gets", getAllOrdersOfAllUser);
router.get("/details/:id", getOrderDetailsForAdmin);
router.put("/update/:id", updateOrderStatus);
export default router;
