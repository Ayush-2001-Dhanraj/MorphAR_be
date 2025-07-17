import express from "express";
import multer from "multer";
import { createTask, checkTaskStatus } from "../controllers/tasksController.js";

const router = express.Router();

// Setup file upload with multer
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), createTask);
router.get("/:id/status", checkTaskStatus);

export default router;
