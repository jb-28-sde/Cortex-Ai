import expres from "express";
import {
  createConversation,
  getConversations,
  getMessages,
  saveMessage,
  updateConversation,
} from "../controllers/chat.controller.js";
const router = expres.Router();
router.get("/create-conversation", createConversation);
router.get("/get-conversation", getConversations);
router.post("/update-conversation", updateConversation);
router.post("/save-message", saveMessage);
router.get("/get-messages/:conversationId", getMessages);
export default router;
