# NodeJS API

## Ziel

1. Einrichtung der Entwicklungsumgebung
    - Git/GitHub
    - NodeJS
    - TypeScript
    - Docker
    - Postman

2. Erstellen einer NodeJS API mit folgenden Routen
    - Anmeldung
    - Registrierung
    - Passwort zurücksetzen

3. Deployment auf einem Server (Hetzner Cloud)

## Schritte

- [x] Installation
    - [x] NodeJS
    - [x] WebStorm/PhpStorm/VSCode
    - [x] Postman
- [x] Git/GitHub Code Backup und Versionierung
    - [x] Git Repository erstellen
    - [x] .gitignore
    - [x] Commit und Push
- [x] package.json und wichtige Pakete installieren
    - [x] tsx
    - [x] typescript
    - [x] nodemon
- [x] Einrichtung von TypeScript
    - [x] tsconfig.json
    - [x] src und dist Ordner
    - [x] npm run build
    - [x] npm run dev
- [x] Einrichtung von environment Variablen
    - [x] dotenv
    - [x] .env
- [ ] Einrichtung von Express
    - [x] app.ts
    - [x] routes (/ping, /api/v1/auth/login, /api/v1/auth/register, /api/v1/auth/reset-password, /api/v1/user)
    - [ ] middleware (Berechtigungen prüfen nach der Authentifizierung)
- [x] Einrichtung von Docker und Datenbank
    - [x] docker-compose.yml
- [ ] Registrierung Controller
- [ ] Anmeldung Controller
- [ ] Passwort zurücksetzen Controller