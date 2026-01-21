import express from "express";
import { db } from "../database/mysql.js";

const router = express.Router();

// Inscription
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const [result] = await db.execute(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password]
  );

  res.json({ id: result.insertId, username });
});

// Connexion
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const [rows] = await db.execute(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password]
  );

  if (rows.length === 0) {
    return res.status(401).json({ error: "Identifiants incorrects" });
  }

  res.json(rows[0]);
});

export default router;
