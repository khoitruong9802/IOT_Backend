import express from "express";
import { getAllSchedule, getScheduleById, createSchedule, updateSchedule, deleteSchedule } from "../controllers/ScheduleController.js";

const router = express.Router();

router.get("/", getAllSchedule);
router.get("/:schedule_id", getScheduleById);
router.post("/", createSchedule);
router.put("/:schedule_id", updateSchedule);
router.delete("/:schedule_id", deleteSchedule);

export default router;