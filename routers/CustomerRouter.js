import express from "express";
import { getCustomers, createCustomer, updateCustomer, loginCustomer, deleteCustomer } from "../controllers/CustomerController.js";

const router = express.Router();

router.get("/", getCustomers);
router.post("/", createCustomer);
router.post("/login", loginCustomer);
router.post("/update", updateCustomer);
router.delete("/:customer_id", deleteCustomer);

export default router;