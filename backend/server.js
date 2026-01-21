import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import chatRoutes from "./routes/chat.js";
import userRoutes from "./routes/users.js";
import scoreRoutes from "./routes/scores.js";

app.use("/api/users", userRoutes);
app.use("/api/scores", scoreRoutes);

const app = express();

app.use(cors());
app.use(express.json());

// Connexion MongoDB

try {
  await mongoose.connect("mongodb://127.0.0.1:27017/yamzilla");
  console.log("MongoDB connecté");
} catch (err) {
  console.error("Erreur MongoDB :", err);
}

// Routes
app.use("/api/chat", chatRoutes);

// Lancer le serveur
app.listen(3000, () => {
  console.log("Serveur backend lancé sur http://localhost:3000");
});
