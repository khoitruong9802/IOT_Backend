import { Customer } from "../models/CustomerModel.js"
import { checkCustomer } from "../services/CustomerService.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json(error);
  }
}

export const createCustomer = async (req, res) => {
  try {
    const newCustomer = req.body;
    const hash = bcrypt.hashSync(newCustomer.password, 10);
    newCustomer.password = hash;

    const customer = new Customer(newCustomer);
    await customer.save();

    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json(error);
  }
}

export const updateCustomer = async (req, res) => {
  try {
    const updateCustomer = req.body;

    const customer = Customer.findOneAndUpdate({ _id: updateCustomer._id }, updateCustomer, { new: true });
    await customer.save();

    res.status(200).json(customer);
  } catch (error) {
    res.status(200).json(error);
  }
}

export const loginCustomer = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await checkCustomer(req.body);
    const { refresh_token, ...newReponse } = response;
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
    });
    return res.status(200).json({ ...newReponse, refresh_token });
  } catch (e) {
    console.error("Error in login customer:", e);
    return res.status(500).json({
      status: "ERR",
      message: "Internal Server Error",
    });
  }
}

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.customer_id);
    if (!customer) {
      return res.status(400).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}