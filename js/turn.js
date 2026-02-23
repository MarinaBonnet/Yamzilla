// turn.js
import { resetTurn, getGameState, rollDice } from "./game.js";
import { updatePlayerUI } from "./ui.js";
import { comboLabel } from "./labels.js";

export function switchPlayer(currentPlayer) {
  const nextPlayer = currentPlayer === 1 ? 2 : 1;
  resetTurn();
  updatePlayerUI(nextPlayer, getGameState().maxRolls);

  // 👉 Si c'est le bot (joueur 2), il joue automatiquement
  if (nextPlayer === 2) {
    setTimeout(botPlay, 1000);
  }
  return nextPlayer;
}

export function botPlay() {
  console.log("🤖 Le bot joue...");

  // 1) Le bot lance les dés
  rollDice();

  // 2) Le bot choisit un combo disponible (... transforme en NodeList Array => spread)
  const combos = [
    ...document.querySelectorAll(
      '.combo-grid[data-player="2"] li:not(.locked)',
    ),
  ];

  if (combos.length === 0) {
    console.warn("Le bot n'a plus de combos disponibles");
    return;
  }

  const randomCombo = combos[Math.floor(Math.random() * combos.length)];

  // 3) Le bot clique automatiquement sur le combo
  setTimeout(() => {
    randomCombo.click();
  }, 1000);
}
