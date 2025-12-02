# Dashboard Analytics

Un tableau de bord analytique complet (FastAPI + Pandas + Chart.js) pour charger un CSV, calculer des statistiques descriptives et afficher des visualisations interactives.

## Objectifs
- Backend FastAPI: endpoints `/summary` (moyenne, médiane, variance) et `/histogram`.
- Analyse de données: Pandas, Matplotlib.
- Frontend: Vanilla JS + Chart.js (histogramme, série temporelle).
- Tests unitaires: pytest (backend), tests DOM/config (frontend).
- Outils IA: GitHub Copilot & TabNine (prompts, conventions, commandes).
- CI: exécution des tests et lint minimal.

## Prérequis
- Windows 10/11
- Accès à Internet (installation via winget)

## Démarrage rapide (Windows PowerShell)
```powershell
# À la racine du projet (répertoire "dashboard-analytics")
./setup.ps1
# Une fois l'installation terminée, pour lancer le backend:
./run.ps1
# Ouvrez frontend/index.html dans votre navigateur (ou lancez un serveur statique si vous préférez)
```

## Backend
- Dossier: `backend/`
- Lancer localement (si environnement déjà prêt):
```powershell
cd backend
..\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```
- Endpoints:
  - `GET http://127.0.0.1:8000/summary?file_path=../data/sample.csv`
  - `GET http://127.0.0.1:8000/histogram?file_path=../data/sample.csv&column=value&bins=10`

## Frontend
- Ouvrir `frontend/index.html` (Chart.js chargé par CDN).
- Le frontend appelle l'API backend sur `http://127.0.0.1:8000` (CORS autorisé).

## Statistiques (explications simples)
- **Moyenne**: somme des valeurs / nombre d'observations.
- **Médiane**: valeur centrale qui coupe l'échantillon en deux.
- **Variance**: moyenne des carrés des écarts à la moyenne (dispersion).
- **Histogramme**: répartition des valeurs numériques en classes (bins).
- **Séries temporelles**: mesures indexées par le temps, visualisées en courbe.

## Tests
- Backend:
```powershell
cd backend
..\.venv\Scripts\Activate.ps1
pytest -q
```
- Frontend:
```powershell
cd frontend
node tests/test_ui.js
```

## CI
Voir `.github/workflows/ci.yml`.

## Données d'exemple
`data/sample.csv` contient des colonnes `date`, `value`, `category` pour quickstart.
