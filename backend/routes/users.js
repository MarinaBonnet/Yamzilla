import express from "express";
import crypto from "node:crypto";
import bcrypt from "bcrypt";
import {
  getUserByUsername,
  getUserByResetToken,
  saveResetToken,
  clearResetToken,
  updatePassword,
} from "../database/db.js";
import { db } from "../database/mysql.js";
const router = express.Router();

/* ----------------------------------------- 
           Connexion sécurisée 
----------------------------------------- */

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("🟡 Reçu du frontend :", req.body);

  // On récupère l'utilisateur par username

  const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [
    username,
  ]);

  if (rows.length === 0) {
    return res.status(401).json({ error: "Identifiants incorrects" });
  }
  const user = rows[0];
  console.log("🔍 Utilisateur MySQL :", user);

  // Vérification du mot de passe haché
  console.log("Mot de passe EXACT :", JSON.stringify(password));
  console.log("Longueur password :", password.length);
  console.log("Hash EXACT :", JSON.stringify(user.password));
  console.log("Longueur hash :", user.password.length);

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ error: "Identifiants incorrects" });
  }
  res.json({ id: user.id, username: user.username });
});

/* ----------------------------------------- 
            Mot de passe oublié
   ----------------------------------------- */

router.post("/forgot-password", async (req, res) => {
  const { username } = req.body;
  const user = await getUserByUsername(username);
  if (!user) {
    return res.status(400).json({ message: "Utilisateur inconnu" });
  }
  const resetToken = crypto.randomBytes(32).toString("hex");
  await saveResetToken(user.id, resetToken);
  res.json({
    message: "Token généré",
    resetToken,
  });
});

/* ----------------------------------------- 
            Réinitialisation du mot de passe
   ----------------------------------------- */

router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  const user = await getUserByResetToken(token);
  if (!user) {
    return res.status(400).json({ message: "Token invalide" });
  }
  // Hachage du nouveau mot de passe

  const hashed = await bcrypt.hash(newPassword, 10);
  await updatePassword(user.id, hashed);
  await clearResetToken(user.id);
  res.json({ message: "Mot de passe mis à jour" });
});
export default router;
