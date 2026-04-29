## Lancement

1. Copier le fichier d'environnement
```bash
cp .env.example .env
```

2. Remplir les variables dans `.env`

3. Lancer les conteneurs
```bash
docker compose up -d
```

4. Lancer les migrations
```bash
docker compose exec php bash
cd /var/www/server
php bin/console doctrine:migrations:migrate
```

## Accès
- Frontend : http://localhost:3000
- API Symfony : http://localhost