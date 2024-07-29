import express from "express";
import { getAllStation, getStationById, createStation, updateStation, deleteStation } from "../controllers/StationController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = express.Router();

router.get("/", authMiddleware, getAllStation);
router.get("/:station_id", getStationById);
router.post("/", createStation);
router.put("/:station_id", updateStation);
router.delete("/:station_id", deleteStation);

export default router;