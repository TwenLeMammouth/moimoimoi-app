# 🗃️ Schéma Base de Données – MoiMoiMoi (Supabase)

## 🌐 Vue d’ensemble

Base PostgreSQL partagée entre les apps OxyMammoth, avec un champ `app_scope` pour distinguer les données selon l’application.

> Chaque table est sécurisée par RLS.  
> Les données critiques sont liées à l’utilisateur connecté (`auth.uid()`).

---

## 🔐 Tables principales

| Table             | Description |
|------------------|-------------|
| `user_profile`    | Informations supplémentaires sur l'utilisateur |
| `user_memory`     | Mémorisation longue IA (valeurs, résumés, historiques) |
| `user_journal`    | Entrées personnelles (optionnelles, privées) |
| `test_sessions`   | Session d’un test commencé par un utilisateur |
| `responses`       | Réponse à une question (1 ligne par question répondue) |
| `ia_sessions`     | Analyse IA d’une facette d’un test (1 par facette) |
| `facets`          | Composants d’un test (ex: extraversion) |
| `facets_prompts`  | Prompt IA associé à chaque facette |
| `questions`       | Questions liées à un test et une facette |
| `questions_translations` | Traductions des questions |
| `tests`           | Définition d’un test disponible (Big Five, etc.) |

---

## 🔗 Liens principaux entre tables

users ─┬─ user_profile
├─ test_sessions ─┬─ responses
│ ├─ ia_sessions (par facette)
└─ user_memory └─ user_journal

tests ─┬─ facets ─┬─ questions ─┬─ responses
│ └─ facets_prompts
└─ tests_translations

---

## 📌 Champs clés à noter

| Table            | Champ          | Usage |
|------------------|----------------|-------|
| `app_scope`      | `'moimoimoi'` ou autre | Permet de filtrer les données dans une base partagée |
| `status`         | `draft`, `done`, `processing`, etc. | Sert pour les workflows utilisateur |
| `deleted`        | soft-delete universel |
| `created_at`     | timestamp pour affichage chronologique |
| `user_id`        | auth.uid() | sécurité et tri des données utilisateur |

---

## ✅ Recommandations

- Activer l'index sur `test_session_id, facet_id` dans `ia_sessions`
- Ajouter des contraintes `UNIQUE` là où pertinent :
  - `responses(user_id, session_id, question_id)`
  - `ia_sessions(user_id, test_session_id, facet_id)`
- Garder les champs `updated_at` pour les sync UI plus tard
- Éviter de mélanger des données de plusieurs apps sans `app_scope`

---

> 📎 Ce document évoluera quand `ReliquiaeNovae` aura ses propres schémas