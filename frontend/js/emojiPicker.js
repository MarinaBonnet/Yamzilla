export const setupEmojiPicker = (container, inputField) => {
  const toggleBtn = container.querySelector(".emoji-toggle");
  const pickerPanel = container.querySelector(".emoji-picker");
  const emojiButtons = pickerPanel.querySelectorAll(".emoji");
  const closeBtn = pickerPanel.querySelector(".emoji-close"); // 🔴 la croix

  // Ouvrir / fermer via le bouton 🎨+
  toggleBtn.addEventListener("click", () => {
    pickerPanel.classList.toggle("hidden");
  });

  // Fermer via la croix rouge ✖
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      pickerPanel.classList.add("hidden");
    });
  }

  // Ajouter emoji dans l’input
  for (const btn of emojiButtons) {
    btn.addEventListener("click", () => {
      inputField.value += btn.textContent;
      inputField.focus();
    });
  }
};
