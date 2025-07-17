import {
  uploadImage,
  createModelTask,
  getTaskStatus,
} from "../services/tripoService.js";
import path from "path";
import fs from "fs";

// POST /api/tasks
export const createTask = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "Image file is required" });

    const filePath = path.join(file.destination, file.filename);
    const mimeType = file.mimetype.split("/")[1];

    const fileToken = await uploadImage(filePath, mimeType);
    const taskId = await createModelTask(fileToken, mimeType);

    // Optional: delete uploaded file after use
    fs.unlinkSync(filePath);

    res.status(200).json({ task_id: taskId });
  } catch (error) {
    console.error(
      "Task creation error:",
      error?.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to create model generation task" });
  }
};

// GET /api/tasks/:id/status
export const checkTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const statusData = await getTaskStatus(id);

    res.status(200).json({ task: statusData });
  } catch (error) {
    console.error("Status check error:", error.message);
    res.status(500).json({ error: "Failed to fetch task status" });
  }
};
