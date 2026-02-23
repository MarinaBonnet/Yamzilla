import express from "express";
import { addScore, getScoresByUser } from "../database/db.js";

const router = express.Router();

// Ajouter un score
router.post("/", async (req, res) => {
  const { user_id, score } = req.body;

  const id = await addScore(user_id, score);

  res.json({ id, user_id, score });
});

// Récupérer les scores d'un joueur
router.get("/:userId", async (req, res) => {
  const rows = await getScoresByUser(req.params.userId);
  res.json(rows);
});

export default router;
