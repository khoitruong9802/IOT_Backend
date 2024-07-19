import express from "express";
import { getAllDeviceData, getDeviceDataById, createDeviceData, updateDeviceData, deleteDeviceData } from "../controllers/DeviceDataController.js";

const router = express.Router();

router.get("/", getAllDeviceData);
router.get("/:deviceData_id", getDeviceDataById);
router.post("/", createDeviceData);
router.put("/:deviceData_id", updateDeviceData);
router.delete("/:deviceData_id", deleteDeviceData);

export default router;