# 🏗️ Architecture technique – OxyMammoth

## Objectif

Fournir une structure claire, évolutive et modulaire pour construire l’écosystème OxyMammoth :  
un ensemble d'applications connectées partageant une base technique commune, mais conservant une logique propre.

---

## 📦 Structure générale (monorepo recommandée)

/oxymammoth/
├── apps/
│ ├── moimoimoi/ # App introspective
│ ├── reliquiae-novae/ # App culturelle
│ └── admin/ # (optionnel) back-office pour dev/admin
│
├── packages/
│ ├── ui-kit/ # Composants visuels réutilisables
│ ├── lib-supabase/ # Fonctions de gestion Supabase (auth, fetch, RLS)
│ ├── ai-core/ # Logique d’appel IA (Assistants, MMMask, mémoire)
│ └── types/ # Types TS partagés entre apps
│
├── .gitignore
├── turbo.json
└── README.md

---

## 🔁 Flux utilisateur global

1. L’utilisateur s’inscrit (via Supabase Auth)
2. Il est redirigé vers une app active (`moimoimoi`)
3. Toutes ses données sont stockées dans Supabase avec un champ `app_scope`
4. L’IA associée (MMMask ou autre) suit sa mémoire contextuelle
5. Les autres apps peuvent lire son profil, ses données ou son historique selon autorisation

---

## 🧠 Noyaux partagés entre apps

- Authentification (`supabase.auth`)
- Gestion de session utilisateur
- Stockage mémoire utilisateur (`user_memory`)
- Appels IA et analyse (`ia_sessions`)
- Composants UI cohérents (boutons, layout, thème dynamique)
- Base de données unifiée avec `app_scope = 'moimoimoi' | 'reliquiae' | ...`

---

## 🧪 Tests, build et développement

- `Turborepo` pour gérer les builds de chaque app séparément
- Tests unitaires et d’intégration à venir (`vitest`, `playwright`)
- Linting et typage strict (`eslint`, `typescript`)

---

## 🧭 Stratégie déploiement (à venir)

- Déploiement via Vercel ou Railway (multi-apps possible)
- Stockage centralisé Supabase
- Un token d’API interne partagé entre apps pour accéder aux fonctions IA
- Dashboard d’administration privé via `apps/admin`

---

## 🔒 Sécurité

- RLS activées sur toutes les tables sensibles
- Auth par Supabase + rôle `admin` en base
- Séparation frontend/backend (aucune logique sensible dans le client)

---

## 🧩 Spécificités par application

| App              | Spécificité |
|------------------|-------------|
| `moimoimoi`      | UI ludique, avatar animé, réponses enrichies, IA par facette |
| `reliquiae-novae`| Base consultable, fiches objets, moteur de recherche IA |
| `admin`          | Lecture stats, modération, test de prompts, debug mémoire |

---

> 📌 Cette structure est volontairement ambitieuse, mais progressive.  
Elle permet de démarrer petit, et de construire un écosystème durable.