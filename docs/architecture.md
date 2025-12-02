# Architecture

## Pipeline de données
- Source CSV (ex: `data/sample.csv`).
- Backend charge et nettoie les données via Pandas.
- Calcul des statistiques: moyenne, médiane, variance.
- Génération de données d'histogramme (bins).

## Backend (FastAPI)
- `app/main.py`: instancie FastAPI, CORS, inclut `routers/analytics.py`.
- `routers/analytics.py`:
  - `GET /summary`: retourne `{ mean, median, variance }`.
  - `GET /histogram`: retourne `{ data: [{value, count}] }`.
- `services/data_processing.py`:
  - `load_csv(path)`, `calculate_summary_statistics(df)`, `generate_histogram_data(df, column, bins)`.
- `models/schema.py`: modèles Pydantic pour les réponses.

## Frontend
- `index.html`: page simple, Chart.js via CDN.
- `src/app.js`: appels API, rendu des graphiques.
- `src/charts/config.js`: fonctions pures pour construire les configs Chart.js.

## Rôles des services
- Les services encapsulent la logique métier (I/O CSV, stats, histogramme) séparée des routes.
- Les modèles Pydantic documentent et valident les réponses.
