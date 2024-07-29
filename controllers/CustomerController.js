import { Customer } from "../models/CustomerModel.js"
import { checkCustomer } from "../services/CustomerService.js"
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { refreshTokenJwtService } from "../services/JwtService.js"

dotenv.config();

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json(error);
  }
}

export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customer_id);
    if (!customer) {
      return res.status(400).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const createCustomer = async (req, res) => {
  try {
    const newCustomer = req.body;
    // const hash = bcrypt.hashSync(newCustomer.password, 10);
    // newCustomer.password = hash;

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
    // const hash = bcrypt.hashSync(updateCustomer.password, 10);
    // updateCustomer.password = hash;

    const customer = await Customer.findByIdAndUpdate(req.params.customer_id, req.body, { new: true, runValidators: true });
    if (!customer) {
      return res.status(400).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
    // res.cookie("refresh_token", refresh_token, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "strict",
    //   path: "/",
    // });
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

export const refreshToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    const response = await refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

export const logoutCustomer = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      status: "OK",
      message: "Logout successfully",
    });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};