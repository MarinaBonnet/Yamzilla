import { setupEmojiPicker } from "./emojiPicker.js";

let unreadCount = 0;

const getRandomColor = () => {
  const colors = [
    "#e74c3c",
    "#3498db",
    "#2ecc71",
    "#f39c12",
    "#9b59b6",
    "#1abc9c",
    "#e67e22",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const playerColors = {
  1: getRandomColor(),
  2: getRandomColor(),
};

const formatMessage = (msg) =>
  msg
    .replaceAll(/bravo/gi, "👏")
    .replaceAll(/lol/gi, "😂")
    .replaceAll(/chat/gi, "🐱")
    .replaceAll(/yes/gi, "✅")
    .replaceAll(/no/gi, "❌")
    .replaceAll(/yamzilla/gi, "🐉🎲");

const createBubble = (message, color) => {
  const bubble = document.createElement("div");
  bubble.classList.add("chat-bubble");
  bubble.style.color = color;
  bubble.textContent = `👤 ${formatMessage(message)}`;
  return bubble;
};

// --- API BACKEND ---
// Envoie un message au backend
async function sendMessageToBackend(userId, sender, message) {
  try {
    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, sender, message }),
    });
    return await response.json();
  } catch (err) {
    console.error("Erreur envoi message backend :", err);
  }
}

// Récupère l'historique depuis MongoDB
async function loadChatHistory(userId) {
  try {
    const response = await fetch(`http://localhost:3000/api/chat/${userId}`);
    return await response.json();
  } catch (err) {
    console.error("Erreur chargement historique :", err);
    return [];
  }
}

export const setupChat = (currentPlayerRef) => {
  const panel = document.querySelector(".chat-panel");
  const toggleBtn = document.querySelector(".chat-toggle");
  const log = panel.querySelector(".chat-log");
  const form = panel.querySelector(".chat-controls");
  const input = form.querySelector(".chat-input");

  // Charger l'historique du joueur

  const userId = "player1"; // plus tard  mettre un vrai ID
  loadChatHistory(userId).then((history) => {
    history.forEach((msg) => {
      const color = msg.sender === "user" ? playerColors[1] : playerColors[2];

      const bubble = createBubble(msg.message, color);
      log.appendChild(bubble);
    });
    log.scrollTop = log.scrollHeight;
  });

  // Toggle chat panel
  toggleBtn.addEventListener("click", () => {
    panel.classList.toggle("hidden");
    // si panneau ouvert > reset compteur
    if (!panel.classList.contains("hidden")) {
      unreadCount = 0;
      toggleBtn.textContent = "💬 Chat";
    }
  });

  // Handle message submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (message) {
      const bubble = createBubble(message, playerColors[1]);
      log.appendChild(bubble);

      // Envoi au backend
      sendMessageToBackend(userId, "user", message);

      input.value = "";
      log.scrollTop = log.scrollHeight;
      playPingSound();
      if (panel.classList.contains("hidden")) {
        unreadCount++;
        toggleBtn.classList.add("ping");
        toggleBtn.textContent = `💬 Chat (${unreadCount})`;
        setTimeout(() => toggleBtn.classList.remove("ping"), 600);
      }
    }
  });

  // Setup emoji picker
  setupEmojiPicker(panel, input);
};
// son pour messages chat
const playPingSound = () => {
  const audio = new Audio("./assets/sounds/message-ping.mp3");
  audio.volume = 0.3;
  audio.play();
};
