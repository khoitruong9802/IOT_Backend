import express from "express";
import { getAllSensorData, getSensorDataById, createSensorData, updateSensorData, deleteSensorData } from "../controllers/SensorDataController.js";

const router = express.Router();

router.get("/", getAllSensorData);
router.get("/:sensorData_id", getSensorDataById);
router.post("/", createSensorData);
router.put("/:sensorData_id", updateSensorData);
router.delete("/:sensorData_id", deleteSensorData);

export default router;