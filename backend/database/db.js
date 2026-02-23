import { db } from "./mysql.js";

// Récupérer un utilisateur par username
export async function getUserByUsername(username) {
  const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  return rows[0];
}

// Récupérer un utilisateur via son token
export async function getUserByResetToken(token) {
  const [rows] = await db.execute("SELECT * FROM users WHERE reset_token = ?", [
    token,
  ]);
  return rows[0];
}

// Sauvegarder un token de réinitialisation
export async function saveResetToken(userId, token) {
  await db.execute("UPDATE users SET reset_token = ? WHERE id = ?", [
    token,
    userId,
  ]);
}

// Effacer le token après réinitialisation
export async function clearResetToken(userId) {
  await db.execute("UPDATE users SET reset_token = NULL WHERE id = ?", [
    userId,
  ]);
}

// Mettre à jour le mot de passe
export async function updatePassword(userId, newPassword) {
  await db.execute("UPDATE users SET password = ? WHERE id = ?", [
    newPassword,
    userId,
  ]);
}
// Ajouter un score
export async function addScore(userId, score) {
  const [result] = await db.execute(
    "INSERT INTO scores (user_id, score) VALUES (?, ?)",
    [userId, score],
  );
  return result.insertId;
}
// Récupérer les scores d'un joueur
export async function getScoresByUser(userId) {
  const [rows] = await db.execute(
    "SELECT * FROM scores WHERE user_id = ? ORDER BY score DESC",
    [userId],
  );
  return rows;
}
