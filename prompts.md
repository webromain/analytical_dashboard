# Ce fichier contient tous les prompts utilisés pour arriver au résultat final

---

## 📊 Rapport d'analyse : Impact des outils IA sur la productivité

### Outils IA utilisés

| Outil | Rôle | Configuration |
|-------|------|---------------|
| **GitHub Copilot** | Génération de code, suggestions contextuelles | `.github/copilot-instructions.md` |
| **TabNine** | Auto-complétion, commandes personnalisées | `.tabnine_commands` |
| **Copilot Chat** | Assistance conversationnelle, refactoring | Prompts interactifs |

---

### Métriques de productivité estimées

#### ⏱️ Temps de développement

| Tâche | Sans IA (estimé) | Avec IA (réel) | Gain |
|-------|------------------|----------------|------|
| Structure projet complète | 2-3h | 15-20 min | **~85%** |
| Backend FastAPI (routes + services) | 3-4h | 30-45 min | **~80%** |
| Frontend (UI + graphiques) | 4-5h | 1h | **~80%** |
| Tests unitaires (AAA) | 1-2h | 15-20 min | **~85%** |
| Documentation (README, architecture) | 1-2h | 10-15 min | **~90%** |
| CI/CD pipeline | 30-45 min | 5-10 min | **~80%** |
| **Total estimé** | **12-17h** | **2-3h** | **~83%** |

#### 📈 Qualité du code

| Aspect | Impact IA |
|--------|-----------|
| **Cohérence du style** | ✅ Instructions Copilot garantissent snake_case/camelCase |
| **Couverture tests** | ✅ Pattern AAA systématiquement appliqué |
| **Documentation** | ✅ Docstrings Google style générées automatiquement |
| **Bonnes pratiques** | ✅ Séparation services/routes, fonctions pures |
| **Gestion d'erreurs** | ✅ Try/catch, validation Pydantic |

### Points forts de l'utilisation IA

| Avantage | Description |
|----------|-------------|
| **Rapidité** | Génération de boilerplate en secondes |
| **Consistance** | Style uniforme grâce aux instructions personnalisées |
| **Exploration** | Suggestions de patterns inconnus (glassmorphism CSS) |
| **Debug** | Identification rapide des erreurs (ex: API dépréciées pandas) |
| **Documentation** | README et docstrings générés automatiquement |

### Limites observées

| Limite | Exemple | Solution |
|--------|---------|----------|
| **APIs dépréciées** | `infer_datetime_format=True` obsolète | Vérification manuelle + mise à jour |
| **Contexte limité** | Oubli de certaines dépendances entre fichiers | Prompts plus explicites |
| **Spécificités OS** | Scripts PowerShell sur Linux | Demande de conversion explicite |

---

### Recommandations pour maximiser la productivité IA

1. **Configurer les instructions** : `.github/copilot-instructions.md` personnalisé
2. **Prompts détaillés** : Spécifier technologies, conventions, structure attendue
3. **Itérer** : Affiner les résultats par prompts successifs
4. **Vérifier** : Toujours tester le code généré (APIs dépréciées, edge cases)
5. **Documenter** : Garder trace des prompts efficaces dans `prompts.md`

---

### Conclusion

L'utilisation combinée de **GitHub Copilot** et **TabNine** a permis de réduire le temps de développement d'environ **83%** tout en maintenant une qualité de code élevée. Les outils IA excellent pour :
- La génération de structure et boilerplate
- L'application cohérente de conventions
- La documentation automatique

Cependant, une **supervision humaine reste indispensable** pour :
- Valider la pertinence métier
- Corriger les APIs obsolètes
- Adapter aux spécificités de l'environnement d'exécution

---

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

## Prompt d'améliorations et corrections de bugs

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
