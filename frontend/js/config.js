import { comboLabel } from "./labels.js";

export const userConfig = {
  soundEnabled: true,
  theme: "light",
  diceStyle: "classic",
  animations: true,
};

// 🔥 Préchargement des sons
const sounds = {
  yam: document.getElementById("yamSound"),
  roll: document.getElementById("rollSound"),
  click: document.getElementById("clickSound"),
};

// 🔥 Permet de rejouer immédiatement
Object.values(sounds).forEach((audio) => {
  audio.preload = "auto";
});

/**
 * Active ou désactive le son
 */
export function toggleSound() {
  userConfig.soundEnabled = !userConfig.soundEnabled;
  updateSoundUI();
}

/**
 * Met à jour l'interface du bouton son
 */
export function updateSoundUI() {
  const soundBtn = document.querySelector(".sound-toggle");
  if (soundBtn) {
    soundBtn.textContent = userConfig.soundEnabled
      ? "🔊 Son activé"
      : "🔇 Son coupé";
  }
}

/**
 * Joue un son si activé
 */
export function playSound(name) {
  if (!userConfig.soundEnabled) return;

  const audio = sounds[name];
  if (!audio) return;

  audio.currentTime = 0; // 🔥 rejoue depuis le début
  audio.play().catch((err) => {
    console.error("Erreur lors de la lecture du son :", err);
  });
}
