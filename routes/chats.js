import express from "express";
import {
  getChats,
  createChat,
  getChat,
  deleteChat,
} from "../controllers/chatsController.js";

const router = express.Router();

router.get("/", getChats);
router.get("/:id", getChat);
router.delete("/:id", deleteChat);
router.post("/", createChat); // POST /api/chats

export default router;
