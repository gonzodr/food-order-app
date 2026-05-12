# 🍕 Food Order App

Webes ételrendelő alkalmazás, amely lehetővé teszi a felhasználók számára az ételek böngészését, kosárba helyezését és rendelések leadását.

## Technológiák

**Backend:**
- Node.js + Express
- PostgreSQL (adatbázis)
- Redis (caching)
- JWT (autentikáció)
- bcrypt (jelszóhash)

**Frontend:**
- HTML5 + CSS3 + Vanilla JavaScript
- Reszponzív design (Flexbox + Grid)

**DevOps:**
- Docker + Docker Compose
- Git + GitHub

## Funkciók

- Ételek böngészése kategóriák szerint (pizza, burger, tészta, desszert)
- Kosár kezelése (hozzáadás, eltávolítás)
- Felhasználói regisztráció és bejelentkezés (JWT)
- Rendelés leadása (autentikált felhasználóknak)
- Redis cache az ételek gyorsabb betöltéséhez
- Docker konténerizáció

## Telepítés és futtatás

### Előfeltételek
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org) (v20+)
- [Git](https://git-scm.com)

### 1. Klónozás

```bash
git clone https://github.com/FELHASZNÁLÓNÉV/food-order-app.git
cd food-order-app
```

### 2. Adatbázis és Redis indítása

```bash
docker-compose up -d postgres redis
```

### 3. Backend indítása

```bash
cd backend
npm install
npm run dev
```

### 4. Frontend megnyitása

Nyisd meg a `frontend/index.html` fájlt Live Server segítségével VS Code-ban, vagy egyszerűen böngészőben.

### 5. Teljes stack Docker-rel

```bash
docker-compose up -d
```

## Tesztek futtatása

```bash
cd backend
npm test
```

**12 teszt** – foods, auth és orders végpontokra (unit + integration).

## Projektstruktúra

food-order-app/
├── backend/
│   ├── src/
│   │   ├── controllers/    # API logika
│   │   ├── middleware/     # auth, cache
│   │   ├── routes/         # végpontok
│   │   └── db/             # adatbázis kapcsolat
│   └── tests/              # Jest tesztek
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── database/
│   └── schema.sql          # adatbázis séma + seed adatok
├── docker-compose.yml
├── Dockerfile.backend
└── README.md


## 🔑 API Végpontok

| Metódus | Végpont | Leírás | Auth |
|--------|---------|--------|------|
| GET | /api/foods | Összes étel listázása | ❌ |
| GET | /api/foods/:id | Egy étel lekérése | ❌ |
| POST | /api/auth/register | Regisztráció | ❌ |
| POST | /api/auth/login | Bejelentkezés | ❌ |
| POST | /api/orders | Rendelés leadása | ✅ |
| GET | /api/orders/my | Saját rendelések | ✅ |

## ⚙️ Környezeti változók

A `backend/.env` fájlban:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=foodorder
JWT_SECRET=valami_titkos_kulcs_123
REDIS_URL=redis://localhost:6379
```
