import express from "express";
import { getAllDevice, getDeviceById, createDevice, updateDevice, deleteDevice } from "../controllers/DeviceController.js";

const router = express.Router();

router.get("/", getAllDevice);
router.get("/:device_id", getDeviceById);
router.post("/", createDevice);
router.put("/:device_id", updateDevice);
router.delete("/:device_id", deleteDevice);

export default router;