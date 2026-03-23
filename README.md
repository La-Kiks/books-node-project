# Backend d'un site de notations de livres

Projet à but éducatif via Open Classrooms.

## Pré-requis

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (pour Windows)
- [Nodemon](https://nodemon.io/) installé globalement:
  ```bash
  npm install -g nodemon
  ```

---

## Installation

### Step 1 — Cloner le repository

```bash
git clone https://github.com/La-Kiks/books-node-project.git
cd books-node-project
```

---

### Step 2 — Lancer la database MongoDB

Vérifier que **Docker Desktop est lancé**, puis dans le **dossier root**:

```bash
docker compose up -d
```

Cela va lancer la base de données MongoDB dans un container local. Les données seront stockées entre chaque session.

Pour arrèter la database :

```bash
docker compose down
```

> ⚠️ Ne pas utiliser `docker compose down -v` sauf si l'on veut **effacer la database**.

---

### Step 3 — Lancer le backend

Ouvrir un terminal dans le **dossier backend**:

```bash
cd backend
nodemon server
```

Vous devriez voir apparaitre ceci dans le terminal :

```
Server listening on http://localhost:3500
MongoDB connected
```

---

### Step 4 — Lancer le frontend

Ouvrir un **nouveau terminal** dans le **dossier frontend**:

```bash
cd frontend
npm install
npm start
```

L'application est visible sur **http://localhost:3000**

---

### Step 5 - Tester l'application

Créer vous un compte, ajoutez des livres, notez les, modifer les, supprmier les, déconnecter vous, essayer de modifier les livres ou les noter en étant déconnecté.

---

## Environment Variables

> ⚠️ Ce projet est à but éducatif, les fichiers `.env` ont été commit. Dans un scénario de production on ajoute les `.env` au `.gitignore`.

---

## 🗂️ Project Structure

```
root/
├── .env                  ← Docker credentials
├── docker-compose.yml
├── backend/
│   ├── .env              ← Express/Mongoose config
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── images/           ← Uploaded book images
│   ├── app.js
│   └── server.js
└── frontend/
```

---

## 🔌 API Routes

### Auth

| Method | URL                | Description                         |
| ------ | ------------------ | ----------------------------------- |
| POST   | `/api/auth/signup` | Inscription d'un nouvel utilisateur |
| POST   | `/api/auth/login`  | Se connecter et avoir un token      |

### Books

| Method | URL                     | Auth | Description                            |
| ------ | ----------------------- | ---- | -------------------------------------- |
| GET    | `/api/books`            | ❌   | Récupérer TOUS les livres              |
| GET    | `/api/books/bestrating` | ❌   | Récupérer les 3 livres les mieux notés |
| GET    | `/api/books/:id`        | ❌   | Récupérer UN livre                     |
| POST   | `/api/books`            | ✅   | Ajouter un livre                       |
| PUT    | `/api/books/:id`        | ✅   | Editer un livre                        |
| DELETE | `/api/books/:id`        | ✅   | Supprimer un livre                     |
| POST   | `/api/books/:id/rating` | ✅   | Noter un livre                         |
