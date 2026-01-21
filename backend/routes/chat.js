import express from "express";
import ChatMessage from "../models/ChatMessage.js";

const router = express.Router();

// Enregistrer un message

router.post("/", async (req, res) => {
  const { userId, sender, message } = req.body;

  const msg = await ChatMessage.create({
    userId,
    sender,
    message,
  });

  res.json(msg);
});

// Récupérer l'historique

router.get("/:userId", async (req, res) => {
  const messages = await ChatMessage.find({ userId: req.params.userId }).sort({
    timestamp: 1,
  });

  res.json(messages);
});

export default router;
