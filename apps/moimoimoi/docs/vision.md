# 🌍 Vision Long Terme – OxyMammoth

## 🔸 Présentation

**OxyMammoth** est un univers logiciel ouvert, modulaire et éthique.  
Il vise à créer des applications utiles, intelligentes et durables — à la croisée de l’introspection, de la mémoire humaine, de la culture oubliée et des solutions concrètes à nos défis actuels.

Ce projet est né d’un simple test IA…  
Mais il évolue aujourd’hui vers une **suite d’outils interconnectés** pour mieux se connaître, mieux transmettre, et mieux construire.

---

## 🧩 Objectifs fondamentaux

- Créer des **applications à fort impact personnel et collectif**
- Construire une **base technique unifiée** (auth, mémoire, IA)
- Valoriser l’**expérience utilisateur humaine, douce, progressive**
- Permettre une **mémoire IA évolutive** — sans dépendance aux plateformes
- Offrir une **ouverture vers l’éducation, la création, l’innovation**

---

## 🏗️ Architecture projet

Le projet est conçu comme un **monorepo modulaire**, contenant plusieurs applications indépendantes mais connectées :

```txt
/oxymammoth
├── apps/
│   ├── moimoimoi/         # introspection, avatar IA, mémoire personnelle
│   ├── reliquiae-novae/   # base d'inventions oubliées + matériaux
│   └── admin/             # (optionnel) console de pilotage globale
│
├── packages/
│   ├── ui-kit/            # composants visuels partagés
│   ├── lib-supabase/      # logique RLS, hooks, gestion utilisateur
│   ├── ai-core/           # logique mémoire + GPT assistant (MMMask)
│   └── types/             # types partagés entre apps

Toutes les apps sont liées par un compte utilisateur unique et une mémoire partagée évolutive.

---

## 🧠 Applications prévues
    MoiMoiMoi (V1 – été 2025)
        Tests psychologiques (Big Five, attachement, etc.)

        Analyse IA par facette

        Journal personnel + mythologie

        Avatar animé : MMMask

        Modèle économique : freemium + IA payante

    ReliquiaeNovae (2026)
        Librairie de concepts oubliés (inventions, matériaux, idées)

        Recherche multicritères, fiches vivantes, IA de synthèse

        Objectif : transmission, inspiration, éducation libre

        Usage possible en milieu scolaire ou fablab

    ClimaTiles / ToitToitToit (2026+) (Pas une application)
        Projets techniques modulaires, ouverts, consultables librement

        Utilisation de la même base utilisateur, IA, et moteur de mémoire

        Exemple : tuile écologique connectée, base de savoirs open-source, etc.

---

    ## 🧬 Noyaux partagés
        🧠 Mémoire IA évolutive : user_memory, personal_mythology, ia_sessions

        🔐 Auth Supabase + RLS renforcée

        💬 Assistants API (GPT-5) + personnalisation par app

        📦 UI partagée, theming contextuel

        🔗 Structure de base de données unifiée avec champ app_scope

---

    🎯 Vision en une phrase
        Offrir aux utilisateurs des outils puissants et bienveillants pour explorer ce qu’ils sont, ce qu’ils pourraient transmettre…
        …et ce que l’humanité a peut-être oublié.

---

    📆 Timeline souhaitée
        Date	Objectif
        Août 2025	V1 publique de MoiMoiMoi (tests IA)
        Hiver 2025	Passage en monorepo OxyMammoth
        Printemps 2026	MVP de ReliquiaeNovae
        Été 2026	Mémoire IA inter-apps
        Fin 2026	Suite complète disponible (privée ou publique)

---

    🧠 Post GPT-5
        Une fois GPT-5 lancé, l’écosystème basculera sur :

        Agents personnalisés persistants (MMMask)

        Génération assistée de contenu (auto-fiches, intros synthétiques, concepts liés)

        IA continue (conversation mémoire + liens entre apps)

        Plan B : fallback IA locale si OpenAI devient instable ou bloquant

---

    🤝 Usage prévu
        Utilisation individuelle libre

        Usage scolaire/éducatif (licence ou marque blanche)

        Version publique ou auto-hébergeable (long terme)

        Objectif secondaire : démontrer qu’un autre numérique est possible

---

    💡 Philosophie
        Pas de bullshit

        Pas de dark pattern

        Pas de dépendance opaque

        Des idées simples, bien pensées, et qui respectent les gens

---

Ce document est vivant. Il évoluera au fil du projet.