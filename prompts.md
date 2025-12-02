# Ce fichier contient tous les prompts utilisés pour arriver au résultat final

## Prompt de départ & structure

Ce prompt contient toutes les informations qui te seront nécessaires à la construction de l'app.

Créé un Tableau de Bord Analytique : - l’arborescence complète du projet, - les fichiers backend (FastAPI +
Pandas + Matplotlib), - les fichiers frontend (JS + D3.js ou
Chart.js), - la documentation, - les tests unitaires, - les fichiers de
configuration IA (Copilot + TabNine), - un pipeline CI minimal.

---

Objectif global :

Créer un tableau de bord analytique complet permettant de : - charger et
analyser des données utilisateurs, - générer des statistiques
descriptives, - exposer une API backend (FastAPI), - afficher des
visualisations interactives dans une interface web (D3.js ou
Chart.js), - intégrer des outils IA (Copilot + TabNine) pour accélérer
la productivité.

---

Arborescence :

    /dashboard-analytics
     ├── README.md
     ├── .gitignore
     ├── backend/
     │    ├── requirements.txt
     │    ├── app/
     │    │    ├── main.py
     │    │    ├── routers/
     │    │    │     └── analytics.py
     │    │    ├── services/
     │    │    │     └── data_processing.py
     │    │    ├── models/
     │    │    │     └── schema.py
     │    │    ├── utils/
     │    │    └── tests/
     │    │          └── test_analytics.py
     ├── frontend/
     │    ├── package.json
     │    ├── index.html
     │    ├── src/
     │    │    ├── app.js
     │    │    ├── charts/
     │    │    │     ├── barChart.js
     │    │    │     └── timeSeriesChart.js
     │    └── tests/
     │          └── test_ui.js
     ├── docs/
     │    └── architecture.md
     ├── .github/
     │    ├── workflows/
     │    │    └── ci.yml
     │    ├── copilot-instructions.md
     │    └── prompts/
     │         └── generate-unit-tests.prompt.md
     ├── .tabnine_commands
     └── data/
          └── sample.csv

---

Spécifications détaillées à inclure dans les fichiers générés :

1. Backend Python (FastAPI) :

Technologies : - Python 3.9 - FastAPI - Uvicorn - Pandas - Matplotlib

Fonctionnalités minimales : - Endpoint GET /summary retournant : -
moyenne - médiane - variance - Endpoint GET /histogram retournant des
données histogramme - Service de traitement dans data_processing.py -
Modèle Pydantic dans schema.py - Exemple d’import CSV dans sample.csv

---

2. Frontend JavaScript :

Technologies : - Vanilla JS + ES modules - D3.js ou Chart.js (Copilot
choisit un des deux automatiquement)

Fonctionnalités minimales : - Dashboard avec : - histogramme - courbe
temporelle - app.js gère : - appels API - mise à jour des graphiques

---

3. Documentation :

README.md

Doit contenir : - but du projet - installation backend + frontend -
lancement - explications pour étudiants non spécialistes : - moyenne /
médiane / variance - histogrammes - séries temporelles

docs/architecture.md

Décrire : - pipeline de données - architecture backend - architecture
frontend - rôles des services

---

4. CI minimal (.github/workflows/ci.yml) :

Inclure : - installation Python - installation Node - exécution tests
backend + frontend - lint minimal

---

5. Tests unitaires :

Respect du AAA (Arrange / Act / Assert).

Backend : - tests FastAPI - tests Pandas (résumés statistiques)

Frontend : - tests DOM - tests génération de graphiques

---

6. Outils IA :

Copilot

Créer : .github/copilot-instructions.md - style de code recommandé -
conventions de nommage - structure pour docstrings

.github/prompts/generate-unit-tests.prompt.md - modèle de génération de
tests AAA

TabNine

Créer : .tabnine_commands avec commandes : - generate_histogram -
generate_time_series - explain_stat_mean - explain_stat_variance -
explain_histogram

---

Instruction finale :

Génère automatiquement l’ensemble de cette arborescence ainsi que tous
les fichiers, contenus et templates décrits dans ce prompt.
Ne demande pas d’informations supplémentaires.
Ne laisse aucun fichier vide (ajoute du code minimal ou une doc).
Respect strict des conventions, technologies et objectifs.
L'application doit être fonctionnelle.
Un fichier de configuration doit être créé à la racine du projet afin d'initialiser l'environnement et de permettre le lancement de l'application sur un poste vierge.

## Pompt d'améliorations et corrections de bugs

Objectif : Créer une interface web moderne, responsive et élégante,
style clear glass façon Apple, permettant de charger un fichier CSV et
d’afficher automatiquement un histogramme, une série temporelle et un
résumé statistique, avec un seul bouton d’action.

---

Exigences UI / UX - Style clear glass / glassmorphism (type Apple macOS
Vision Pro). - Interface moderne, épurée et ergonomique. - Layout
responsive pour mobile, tablette et desktop. - Menu latéral positionné à
gauche, toujours visible et accessible. - Le menu doit contenir un menu
déroulant (accordion ou dropdown) avec une documentation complète
expliquant le fonctionnement de tous les outils du site. - L’interface
doit être nettement plus jolie et pratique d’utilisation. - Design
cohérent, animations douces, typographie moderne.

---

Fonctionnalités à implémenter

Import CSV - Un seul bouton doit permettre de sélectionner un fichier
CSV via l’explorateur. - Lorsqu’un CSV est importé, l’histogramme, la
série temporelle et le résumé statistique doivent se mettre à jour
automatiquement. - Supprimer complètement les anciennes options
suivantes : - les boutons individuels “Tracer histogramme” - les boutons
individuels “Tracer série” - toute la partie “via chemin manuel”

---

Analyses automatiques Dès qu’un fichier CSV est chargé : 1. Calculer un
résumé statistique : moyenne, minimum, maximum, écart type, etc. 2.
Tracer un histogramme basé sur les colonnes numériques. 3. Tracer une
série temporelle si une colonne date est présente (détection
automatique).

---

Code et architecture - Modifier ou améliorer les fonctions setup et run
si nécessaire pour gérer correctement l’import du fichier CSV, la mise à
jour des graphiques et la gestion des erreurs. - Le code doit être
propre, lisible et maintenable, sans éléments inutiles. - Le traitement
doit être robuste face aux CSV imparfaits.

---

Suppression des éléments obsolètes - Retirer entièrement la section “via
chemin”. - Retirer les boutons individuels “Tracer histogramme” et
“Tracer série”. - Conserver uniquement un bouton central “Importer CSV
et Analyser”.
