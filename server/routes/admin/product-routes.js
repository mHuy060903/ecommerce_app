import express from "express";
import { upload } from "../../helpers/cloudinary.js";
import {
  handleImageUpload,
  addProduct,
  editProduct,
  deleteProducts,
  fetchAllProducts,
} from "../../controller/admin/products-controller.js";

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProducts);
router.get("/get", fetchAllProducts);

export default router;
