import express from "express";
import { UserLogin, UserRegister } from "../controllers/User.js";  // .js extension is necessary
import { addProducts, getproducts, getProductById } from "../controllers/Products.js";  // Also ensure correct path and extension

const router = express.Router();

router.post("/add", addProducts);
router.get("/", getproducts);
router.get("/:id", getProductById);

export default router;
