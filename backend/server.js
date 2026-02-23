import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import chatRoutes from "./routes/chat.js";
import userRoutes from "./routes/users.js";
import scoreRoutes from "./routes/scores.js";

const app = express(); // ✔️ Création de app AVANT les app.use()

// Middlewares
app.use(cors());
app.use(express.json());

// Routes principales
app.use("/api/users", userRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/chat", chatRoutes);

// Connexion MongoDB
try {
  await mongoose.connect("mongodb://127.0.0.1:27017/yamzilla");
  console.log("MongoDB connecté");
} catch (err) {
  console.error("Erreur MongoDB :", err);
}

// Lancer le serveur
app.listen(3000, () => {
  console.log("Serveur backend lancé sur http://localhost:3000");
});

/*
Structure générale typique d’un serveur Express :
Import des modules
Création de app
Middlewares (app.use)
Routes
Lancement du serveur
node server.js
*/
