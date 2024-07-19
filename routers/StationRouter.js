import express from "express";
import { getAllStation, getStationById, createStation, updateStation, deleteStation } from "../controllers/StationController.js";

const router = express.Router();

router.get("/", getAllStation);
router.get("/:station_id", getStationById);
router.post("/", createStation);
router.put("/:station_id", updateStation);
router.delete("/:station_id", deleteStation);

export default router;