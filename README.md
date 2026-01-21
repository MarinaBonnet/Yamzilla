# 🎲 Yamzilla  
Jeu de Yam + Backend Node.js + Système de chat

Yamzilla est un jeu de Yam (Yahtzee) développé en JavaScript, accompagné d’un backend Node.js permettant la gestion des utilisateurs, des scores et d’un système de chat.  
Le projet est structuré en deux parties : **frontend** (jeu + interface) et **backend** (API + base de données).

---

## 🚀 Fonctionnalités principales

### 🎮 Frontend
- Jeu de Yam complet en JavaScript
- Interface responsive
- Gestion des lancers, combinaisons et scores
- Système de chat intégré
- Effets sonores (Web Audio API)
- Animations et feedback utilisateur

### 🛠 Backend (Node.js + Express + MySQL)
- API REST sécurisée
- Inscription / connexion utilisateur
- Hash des mots de passe
- Gestion des scores
- Stockage MySQL
- Variables d’environnement via `.env`
- Architecture modulaire (routes, contrôleurs, base de données)

---

## 📁 Structure du projet
Yamzilla/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── database/
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── js/
│   └── assets/
│
└── README.md

---

## 🧩 Installation du backend

### 1. Installer les dépendances
```bash

cd backend
npm install

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=ton_mot_de_passe
DB_NAME=yamzilla
npm start
http://localhost:3000


## 🔌 Routes API

### 👤 Utilisateurs

| Méthode | Route                | Description |
|---------|----------------------|-------------|
| POST    | /api/users/register | Inscription |
| POST    | /api/users/login    | Connexion   |

---

### 🏆 Scores

| Méthode | Route                     | Description                          |
|---------|---------------------------|--------------------------------------|
| POST    | /api/scores              | Enregistrer un score                 |
| GET     | /api/scores/:userId      | Récupérer les scores d’un utilisateur |

---

## 🗄 Base de données MySQL

### Table `users`
- id (INT, PK)  
- email (VARCHAR)  
- password (HASH)  
- created_at (TIMESTAMP)  

### Table `scores`
- id (INT, PK)  
- user_id (INT, FK)  
- score (INT)  
- created_at (TIMESTAMP)  

---

## 🎨 Technologies utilisées

### Frontend
- HTML5 / CSS3  
- JavaScript  
- Web Audio API  

### Backend
- Node.js  
- Express  
- MySQL (mysql2)    
- dotenv  

---

## 🧪 Tests

Les routes peuvent être testées avec :

- Postman  
- Thunder Client (VS Code)  
  

---

## 📌 Objectifs pédagogiques (RNCP)

- Développer une application web complète (front + back)  
- Concevoir une architecture modulaire  
- Implémenter une API REST sécurisée  
- Gérer une base de données relationnelle  
- Documenter un projet professionnel  
- Utiliser Git et GitHub avec workflow (`main` / `dev`)  

---

## 👩‍💻 Auteur

**Marina Bonnet**  
Développeuse Web & Web Mobile  

---

## 📜 Licence

Projet libre d’utilisation dans un cadre pédagogique.





