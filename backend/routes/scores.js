import express from "express";
import { db } from "../database/mysql.js";

const router = express.Router();

// Ajouter un score
router.post("/", async (req, res) => {
  const { user_id, score } = req.body;

  const [result] = await db.execute(
    "INSERT INTO scores (user_id, score) VALUES (?, ?)",
    [user_id, score]
  );

  res.json({ id: result.insertId, user_id, score });
});

// Récupérer les scores d'un joueur
router.get("/:userId", async (req, res) => {
  const [rows] = await db.execute(
    "SELECT * FROM scores WHERE user_id = ? ORDER BY score DESC",
    [req.params.userId]
  );

  res.json(rows);
});

export default router;
