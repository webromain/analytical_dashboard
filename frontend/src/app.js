import { buildBarChartConfig, buildTimeSeriesConfig } from './charts/config.js';

const API = 'http://127.0.0.1:8000';

// DOM elements
const summaryOut = document.getElementById('summary-out');
const histCanvas = document.getElementById('histCanvas');
const tsCanvas = document.getElementById('tsCanvas');
const csvFileInput = document.getElementById('csv-file');
const histColumnSelect = document.getElementById('hist-column-select');
const histBinsInput = document.getElementById('hist-bins');
const tsDateSelect = document.getElementById('ts-date-select');
const tsValueSelect = document.getElementById('ts-value-select');
const tsFreqSelect = document.getElementById('ts-freq');
const statusEl = document.getElementById('status');
const toastEl = document.getElementById('toast');

let histChart = null;
let tsChart = null;
let selectedPath = null; // server-side sample path fallback

async function fetchJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return await r.json();
}

function setStatus(msg) { if (statusEl) statusEl.textContent = msg; }
function showToast(msg, kind = 'success') {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.remove('success','error');
  toastEl.classList.add(kind === 'error' ? 'error' : 'success');
  toastEl.style.display = 'block';
  setTimeout(() => { toastEl.style.display = 'none'; }, 2500);
}

// --- File upload flows ---
async function loadSummaryFile() {
  const file = csvFileInput && csvFileInput.files ? csvFileInput.files[0] : null;
  if (!file) { if (summaryOut) summaryOut.textContent = 'Veuillez choisir un fichier CSV.'; return; }
  const form = new FormData(); form.append('file', file);
  try {
    setStatus('Analyse du CSV…');
    const r = await fetch(`${API}/summary/upload`, { method: 'POST', body: form });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const data = await r.json();
    if (summaryOut) summaryOut.textContent = JSON.stringify(data, null, 2);
    const rc = await fetch(`${API}/columns/upload`, { method: 'POST', body: form });
    if (rc.ok) {
      const colsPayload = await rc.json();
      populateSelectors(colsPayload.columns || []);
      showToast('Colonnes détectées et sélecteurs mis à jour');
    }
    setStatus('Prêt');
  } catch (e) {
    if (summaryOut) summaryOut.textContent = `Erreur: ${e.message}`;
    showToast(`Erreur: ${e.message}`, 'error');
    setStatus('Erreur');
  }
}

async function loadHistogramFile() {
  const file = csvFileInput && csvFileInput.files ? csvFileInput.files[0] : null;
  if (!file) { if (summaryOut) summaryOut.textContent = 'Veuillez choisir un fichier CSV.'; return; }
  const form = new FormData(); form.append('file', file);
  try {
    setStatus("Calcul de l'histogramme…");
    const column = histColumnSelect ? histColumnSelect.value || 'value' : 'value';
    const bins = Number(histBinsInput ? histBinsInput.value || 10 : 10);
    const r = await fetch(`${API}/histogram/upload?column=${encodeURIComponent(column)}&bins=${bins}`, { method: 'POST', body: form });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const data = await r.json();
    const labels = data.data.map(d => d.value);
    const counts = data.data.map(d => d.count);
    const cfg = buildBarChartConfig(labels, counts, 'Histogramme');
    if (histChart) histChart.destroy();
    histChart = new Chart(histCanvas.getContext('2d'), cfg);
    showToast('Histogramme mis à jour');
    setStatus('Prêt');
  } catch (e) {
    if (summaryOut) summaryOut.textContent = `Erreur: ${e.message}`;
    showToast(`Erreur: ${e.message}`, 'error');
    setStatus('Erreur');
  }
}

async function loadTimeseriesFile() {
  const file = csvFileInput && csvFileInput.files ? csvFileInput.files[0] : null;
  if (!file) { if (summaryOut) summaryOut.textContent = 'Veuillez choisir un fichier CSV.'; return; }
  const dateCol = tsDateSelect ? tsDateSelect.value : null;
  const valueCol = tsValueSelect ? tsValueSelect.value : null;
  const freq = tsFreqSelect ? tsFreqSelect.value || 'D' : 'D';
  if (!dateCol || !valueCol) { if (summaryOut) summaryOut.textContent = 'Sélectionnez les colonnes date et valeur.'; return; }
  const form = new FormData(); form.append('file', file);
  try {
    setStatus('Calcul de la série…');
    const r = await fetch(`${API}/timeseries/upload?date_column=${encodeURIComponent(dateCol)}&value_column=${encodeURIComponent(valueCol)}&freq=${encodeURIComponent(freq)}`, { method: 'POST', body: form });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const data = await r.json();
    const labels = data.data.map(d => d.date);
    const values = data.data.map(d => d.value);
    const cfg = buildTimeSeriesConfig(labels, values, 'Série temporelle');
    if (tsChart) tsChart.destroy();
    tsChart = new Chart(tsCanvas.getContext('2d'), cfg);
    showToast('Série temporelle mise à jour');
    setStatus('Prêt');
  } catch (e) {
    if (summaryOut) summaryOut.textContent = `Erreur: ${e.message}`;
    showToast(`Erreur: ${e.message}`, 'error');
    setStatus('Erreur');
  }
}

function populateSelectors(columns) {
  if (!histColumnSelect || !tsDateSelect || !tsValueSelect) return;
  // preserve previous selections to avoid resetting user's choice
  const prevHist = histColumnSelect.value;
  const prevDate = tsDateSelect.value;
  const prevValue = tsValueSelect.value;

  const numCols = columns.filter(c => c.type === 'number').map(c => c.name);
  histColumnSelect.innerHTML = '';
  numCols.forEach((name) => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    histColumnSelect.appendChild(opt);
  });
  // if previous selection still exists, restore it
  if (prevHist && Array.from(histColumnSelect.options).some(o => o.value === prevHist)) {
    histColumnSelect.value = prevHist;
  }

  const dateCols = columns.filter(c => c.type === 'datetime').map(c => c.name);
  tsDateSelect.innerHTML = '';
  tsValueSelect.innerHTML = '';
  dateCols.forEach((name) => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    tsDateSelect.appendChild(opt);
  });
  // try to restore previous date selection
  if (prevDate && Array.from(tsDateSelect.options).some(o => o.value === prevDate)) {
    tsDateSelect.value = prevDate;
  }
  // populate value (numeric) columns and try to restore
  numCols.forEach((name) => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    tsValueSelect.appendChild(opt);
  });
  if (prevValue && Array.from(tsValueSelect.options).some(o => o.value === prevValue)) {
    tsValueSelect.value = prevValue;
  }
}

function buildExampleTimeSeries() {
  if (!tsCanvas) return;
  const labels = Array.from({ length: 12 }, (_, i) => `2024-${String(i + 1).padStart(2, '0')}`);
  const values = labels.map((_, i) => Math.round(20 + 10 * Math.sin(i / 2)));
  const cfg = buildTimeSeriesConfig(labels, values, 'Série temporelle (exemple)');
  if (tsChart) tsChart.destroy();
  tsChart = new Chart(tsCanvas.getContext('2d'), cfg);
}

async function runAll() {
  const file = csvFileInput && csvFileInput.files ? csvFileInput.files[0] : null;
  setStatus('Exécution en cours…');
  try {
    if (file) {
      await loadSummaryFile();
      if (histColumnSelect && histColumnSelect.options.length > 0) await loadHistogramFile(); else showToast("Aucune colonne numérique détectée pour l'histogramme", 'error');
      if (tsDateSelect && tsDateSelect.options.length > 0 && tsValueSelect && tsValueSelect.options.length > 0) await loadTimeseriesFile(); else showToast('Colonnes date/valeur manquantes pour la série temporelle', 'error');
    } else if (selectedPath) {
      try {
        const sumUrl = `${API}/summary?file_path=${encodeURIComponent(selectedPath)}`;
        const summaryData = await fetchJSON(sumUrl);
        if (summaryOut) summaryOut.textContent = JSON.stringify(summaryData, null, 2);
      } catch (e) { showToast(`Résumé serveur erreur: ${e.message}`, 'error'); }
      try {
        const colsUrl = `${API}/columns?file_path=${encodeURIComponent(selectedPath)}`;
        const colsPayload = await fetchJSON(colsUrl);
        populateSelectors(colsPayload.columns || []);
        showToast('Colonnes détectées et sélecteurs mis à jour');
      } catch (e) { showToast(`Colonnes serveur erreur: ${e.message}`, 'error'); }
      if (histColumnSelect && histColumnSelect.options.length > 0) {
        const column = histColumnSelect.value || 'value';
        const bins = Number(histBinsInput ? histBinsInput.value || 10 : 10);
        try {
          const hUrl = `${API}/histogram?file_path=${encodeURIComponent(selectedPath)}&column=${encodeURIComponent(column)}&bins=${bins}`;
          const hData = await fetchJSON(hUrl);
          const labels = hData.data.map(d => d.value);
          const counts = hData.data.map(d => d.count);
          const cfg = buildBarChartConfig(labels, counts, 'Histogramme');
          if (histChart) histChart.destroy();
          histChart = new Chart(histCanvas.getContext('2d'), cfg);
        } catch (e) { showToast(`Histogramme serveur erreur: ${e.message}`, 'error'); }
      } else { showToast("Aucune colonne numérique détectée pour l'histogramme", 'error'); }
      if (tsDateSelect && tsDateSelect.options.length > 0 && tsValueSelect && tsValueSelect.options.length > 0) {
        const dateCol = tsDateSelect.value; const valueCol = tsValueSelect.value; const freq = tsFreqSelect ? tsFreqSelect.value || 'D' : 'D';
        try {
          const tUrl = `${API}/timeseries?file_path=${encodeURIComponent(selectedPath)}&date_column=${encodeURIComponent(dateCol)}&value_column=${encodeURIComponent(valueCol)}&freq=${encodeURIComponent(freq)}`;
          const tData = await fetchJSON(tUrl);
          const labels = tData.data.map(d => d.date);
          const values = tData.data.map(d => d.value);
          const cfg = buildTimeSeriesConfig(labels, values, 'Série temporelle');
          if (tsChart) tsChart.destroy();
          tsChart = new Chart(tsCanvas.getContext('2d'), cfg);
        } catch (e) { showToast(`Série serveur erreur: ${e.message}`, 'error'); }
      } else { showToast('Colonnes date/valeur manquantes pour la série temporelle', 'error'); }
    } else {
      showToast('Veuillez choisir un fichier CSV ou ouvrir le sample.', 'error');
    }
    setStatus('Prêt');
  } catch (e) {
    showToast(`Erreur: ${e.message}`, 'error');
    setStatus('Erreur');
  }
}

// --- Bindings & UI controls ---
const runAllBtn = document.getElementById('run-all');
if (runAllBtn) runAllBtn.addEventListener('click', runAll);

const openSampleBtn = document.getElementById('open-sample');
if (openSampleBtn) openSampleBtn.addEventListener('click', () => { selectedPath = '../data/sample.csv'; showToast('Sample sélectionné (serveur) — cliquez Exécuter tout'); });

// Helper: load histogram for a server-side path (used when user changes select while using sample)
async function loadHistogramFromPath(path) {
  if (!path) return;
  if (!histColumnSelect || !histCanvas) return;
  const column = histColumnSelect.value || 'value';
  const bins = Number(histBinsInput ? histBinsInput.value || 10 : 10);
  try {
    setStatus("Calcul de l'histogramme (serveur)…");
    const hUrl = `${API}/histogram?file_path=${encodeURIComponent(path)}&column=${encodeURIComponent(column)}&bins=${bins}`;
    const hData = await fetchJSON(hUrl);
    const labels = hData.data.map(d => d.value);
    const counts = hData.data.map(d => d.count);
    const cfg = buildBarChartConfig(labels, counts, 'Histogramme');
    if (histChart) histChart.destroy();
    histChart = new Chart(histCanvas.getContext('2d'), cfg);
    showToast('Histogramme mis à jour (serveur)');
    setStatus('Prêt');
  } catch (e) {
    showToast(`Histogramme serveur erreur: ${e.message}`, 'error');
    setStatus('Erreur');
  }
}

// Recompute histogram when user changes column or bins
if (histColumnSelect) {
  histColumnSelect.addEventListener('change', () => {
    if (csvFileInput && csvFileInput.files && csvFileInput.files.length > 0) {
      loadHistogramFile();
    } else if (selectedPath) {
      loadHistogramFromPath(selectedPath);
    }
  });
}
if (histBinsInput) {
  histBinsInput.addEventListener('change', () => {
    if (csvFileInput && csvFileInput.files && csvFileInput.files.length > 0) {
      loadHistogramFile();
    } else if (selectedPath) {
      loadHistogramFromPath(selectedPath);
    }
  });
}

// Docs & sidebar
const docsBtn = document.getElementById('docs-btn');
const docsPanel = document.getElementById('docs-panel');
const docsClose = document.getElementById('docs-close');
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const navDocs = document.getElementById('nav-docs');
const navOpenSample = document.getElementById('nav-open-sample');

function toggleDocs(show) {
  if (!docsPanel) return;
  docsPanel.style.display = show === undefined ? (docsPanel.style.display === 'none' ? 'block' : 'none') : (show ? 'block' : 'none');
}

function toggleSidebar(show) {
  if (!sidebar) return;
  const shouldOpen = show === undefined ? !sidebar.classList.contains('open') : !!show;
  sidebar.classList.toggle('open', shouldOpen);
  if (hamburger) hamburger.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
  if (shouldOpen) { const first = sidebar.querySelector('a, button'); if (first) first.focus(); }
}

if (docsBtn) docsBtn.addEventListener('click', () => { toggleDocs(); });
if (docsClose) docsClose.addEventListener('click', () => { toggleDocs(false); });
if (navDocs) navDocs.addEventListener('click', (e) => { e.preventDefault(); toggleDocs(true); toggleSidebar(false); });
if (navOpenSample) navOpenSample.addEventListener('click', (e) => { e.preventDefault(); if (openSampleBtn) openSampleBtn.click(); toggleSidebar(false); });
if (sidebar) { const anchorLinks = sidebar.querySelectorAll('a[href^="#"]'); anchorLinks.forEach(a => a.addEventListener('click', () => { toggleSidebar(false); })); }
if (hamburger) { hamburger.setAttribute('aria-expanded', 'false'); hamburger.addEventListener('click', () => { toggleSidebar(); }); }
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { toggleSidebar(false); toggleDocs(false); } });

// Initial render
buildExampleTimeSeries();
