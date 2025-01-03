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
- [x] Einrichtung von Express
    - [x] app.ts
    - [x] routes (/ping, /api/v1/auth/login, /api/v1/auth/register, /api/v1/auth/reset-password, /api/v1/user)
  - [x] middleware (Berechtigungen prüfen nach der Authentifizierung)
- [x] Einrichtung von Docker und Datenbank
    - [x] docker-compose.yml
- [x] Registrierung Controller
- [x] Resend Registration Mail Controller
- [x] Registration Confirmation Controller
- [x] Anmeldung Controller
    - [x] Existiert der User mit den Anmeldeinformationen und hat seine E-Mail-Adresse bestätigt?
    - [x] Ja, dann Token erstellen und zurückgeben
    - [x] Nein, Fehlermeldung zurückgeben
    - [x] Überprüfung der Anmeldeinformationen mit maximalen Versuchen und Banndauer von einer Minute
- [x] Passwort zurücksetzen Controller
- [x] Token Entity erstellen
    - [x] Gültigkeit des Tokens auf bspw. 30 Minuten limitieren
- [x] Token Service erstellen
- [x] Create CRUD User Controller
- [ ] Deploy the whole API on a Hetzner server
