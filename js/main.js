// ─── Imports principaux ─────────────────────────────────────────────────────
import { rollDice } from "./game.js";
import { toggleSound, updateSoundUI } from "./config.js";
import { initializeGame } from "./init.js";
import setupComboClickHandlers from "./events.js";
import { updatePlayerUI, updateComboUI } from "./ui.js";
import { switchPlayer } from "./turn.js";
import { setupChat } from "./chat.js";

// ─── Avatar API ─────────────────────────────────────────────
function generateAvatarFromAPI(userId) {
  return `https://api.dicebear.com/7.x/bottts/svg?seed=${userId}`;
}

// ─── Vérification auto de connexion ─────────────────────────────────────────
function checkAutoLogin() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (token && userId) {
    console.log("🔐 Utilisateur déjà connecté :", userId);

    // Message de bienvenue simple
    const welcome = document.createElement("div");
    welcome.textContent = "Bon retour parmis nous !";
    welcome.style.position = "fixed";
    welcome.style.top = "20px";
    welcome.style.right = "20px";
    welcome.style.background = "#4caf50";
    welcome.style.color = "white";
    welcome.style.padding = "10px 15px";
    welcome.style.borderRadius = "6px";
    welcome.style.zIndex = "1000";
    document.body.appendChild(welcome);
    setTimeout(() => welcome.remove(), 3000);
    return true;
  }
  return false;
}

checkAutoLogin();

// ─── Connexion utilisateur ────────────────────────────────────────────────

/*
document.getElementById("open-login").addEventListener("click", () => {
document.getElementById("login-modal").classList.remove("hidden");
});
*/
document.getElementById("login-btn").addEventListener("click", async () => {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const response = await fetch("http://localhost:3000/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("userId", data.id);
    localStorage.setItem("username", data.username);

    const avatarUrl = generateAvatarFromAPI(data.id);
    localStorage.setItem("avatar", avatarUrl);

    alert("Connexion réussie");
    document.getElementById("login-modal").classList.add("hidden");
  } else {
    alert(data.error || data.message);
  }
});

// ─── Initialisation globale ─────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 YamZilla initialisé");

  // ── Références d’état ─────────────────────────────────────────────────────
  const currentPlayerRef = { value: 1 };
  const playedCombos = {
    1: new Set(),
    2: new Set(),
  };

  // ── Initialisation du jeu ─────────────────────────────────────────────────
  initializeGame(currentPlayerRef.value, playedCombos);
  setupComboClickHandlers(currentPlayerRef, playedCombos);

  // ── Mise à jour de l’interface joueur ─────────────────────────────────────
  updatePlayerUI(currentPlayerRef.value, 3); // 3 = lancers initiaux
  updateComboUI(currentPlayerRef.value, playedCombos);

  // ── Initialisation du chat ────────────────────────────────────────────────

  setupChat(currentPlayerRef);

  // ── Initialisation du son ─────────────────────────────────────────────────
  const soundToggle = document.querySelector(".sound-toggle");
  if (soundToggle) {
    soundToggle.addEventListener("click", toggleSound);
    updateSoundUI();
  } else {
    console.warn("⚠️ Élément .sound-toggle introuvable");
  }

  // ── Bouton de lancer de dés ───────────────────────────────────────────────
  const rollButton = document.querySelector(".roll-btn");
  if (rollButton) {
    rollButton.addEventListener("click", rollDice);
  } else {
    console.warn("⚠️ Bouton .roll-btn introuvable");
  }
});
