# Timelapse

Application de tracking de films et séries avec fonctionnalités sociales.

## Stack technique

- **Frontend** : React, TypeScript, Vite
- **Backend** : Symfony, PHP 8.3, Doctrine ORM
- **Base de données** : MySQL 8.0
- **Authentification** : JWT (LexikJWT) via cookies httpOnly
- **API externe** : The Movie Database (TMDB)
- **Infrastructure** : Docker Compose (PHP-FPM, Nginx, MySQL, phpMyAdmin)

## Prérequis

- Docker et Docker Compose installés
- Un compte TMDB pour obtenir une clé API ([https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api))

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/thomasr10/TimeLapse.git
cd TimeLapse
```

### 2. Configuration des variables d'environnement

Créer un fichier `.env` à la racine du projet avec les variables suivantes :

```env
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_DATABASE=timelapse
MYSQL_USER=timelapse_user
MYSQL_PASSWORD=your_password
```

Créer un fichier `server/.env.local` (ou adapter `server/.env`) avec a minima :

```env
DATABASE_URL="mysql://timelapse_user:your_password@database:3306/timelapse?serverVersion=8.0"
JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
JWT_PASSPHRASE=your_jwt_passphrase
```

Créer un fichier `client/.env` avec :

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_TOKEN=your_tmdb_bearer_token
VITE_API_IMAGE_BASE_URL=https://image.tmdb.org/t/p/
```

### 3. Génération des clés JWT

```bash
docker compose run --rm php php bin/console lexik:jwt:generate-keypair
```

### 4. Lancer l'application

```bash
docker compose up -d --build
```

### 5. Installer les dépendances et initialiser la base de données

```bash
docker exec -it timelapse-php-1 composer install
docker exec -it timelapse-php-1 php bin/console doctrine:database:create
docker exec -it timelapse-php-1 php bin/console doctrine:migrations:migrate
```

## Accès à l'application

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend (API) | http://localhost:8080 |
| phpMyAdmin | http://localhost:8081 |

## Lancer les tests

**Backend (PHPUnit)**
```bash
docker exec -it timelapse-php-1 php bin/phpunit
```

**Frontend (Vitest)**
```bash
cd client
npx vitest run
```

## Structure du projet

```
Timelapse/
├── client/          # Application React
├── server/          # Application Symfony
├── docker/          # Dockerfiles (PHP, Nginx)
├── .github/         # CI
├── docker-compose.yml
└── README.md
```