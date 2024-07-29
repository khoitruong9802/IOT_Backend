import express from "express";
import { getCustomers, getCustomerById, createCustomer, updateCustomer, loginCustomer, deleteCustomer, refreshToken, logoutCustomer } from "../controllers/CustomerController.js";

const router = express.Router();

router.get("/", getCustomers);
router.get("/:customer_id", getCustomerById);
router.post("/", createCustomer);
router.put("/:customer_id", updateCustomer);
router.delete("/:customer_id", deleteCustomer);
router.post("/login", loginCustomer);
router.post("/logout", logoutCustomer);
router.post("/refresh-token", refreshToken);

export default router;