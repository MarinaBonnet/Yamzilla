import bcrypt from "bcrypt";

const password = "1234";
const run = async () => {
  const hash = await bcrypt.hash(password, 10);
  console.log("Hash généré :", hash);
};

run();

// Remplace "TON_MOT_DE_PASSE_ICI" par le mot de passe que tu souhaites hacher
//Pour exécuter ce script, utilisez la commande : node backend/hash.js
// géneration du hash et copié dans la base de données
// Ensuite, j'utilise ce hash pour les tests de connexion
