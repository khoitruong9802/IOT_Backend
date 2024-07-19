import express from "express";
import { getAllSensor, getSensorById, createSensor, updateSensor, deleteSensor } from "../controllers/SensorController.js";

const router = express.Router();

router.get("/", getAllSensor);
router.get("/:sensor_id", getSensorById);
router.post("/", createSensor);
router.put("/:sensor_id", updateSensor);
router.delete("/:sensor_id", deleteSensor);

export default router;