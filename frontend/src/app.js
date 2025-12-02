import { buildBarChartConfig, buildTimeSeriesConfig } from './charts/config.js';

const API = 'http://127.0.0.1:8000';

const summaryOut = document.getElementById('summary-out');
const histCanvas = document.getElementById('histCanvas');
const tsCanvas = document.getElementById('tsCanvas');
const csvPathInput = document.getElementById('csv-path');

let histChart = null;
let tsChart = null;

async function fetchJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return await r.json();
}

async function loadSummary() {
  const p = csvPathInput.value.trim();
  const url = p ? `${API}/summary?file_path=${encodeURIComponent(p)}` : `${API}/summary`;
  try {
    const data = await fetchJSON(url);
    summaryOut.textContent = JSON.stringify(data, null, 2);
  } catch (e) {
    summaryOut.textContent = `Erreur: ${e.message}`;
  }
}

async function loadHistogram() {
  const p = csvPathInput.value.trim();
  const url = p ? `${API}/histogram?file_path=${encodeURIComponent(p)}&column=value&bins=10` : `${API}/histogram`;
  try {
    const data = await fetchJSON(url);
    const labels = data.data.map(d => d.value);
    const counts = data.data.map(d => d.count);
    const cfg = buildBarChartConfig(labels, counts, 'Histogramme');
    if (histChart) histChart.destroy();
    histChart = new Chart(histCanvas.getContext('2d'), cfg);
  } catch (e) {
    summaryOut.textContent = `Erreur: ${e.message}`;
  }
}

function buildExampleTimeSeries() {
  const labels = Array.from({ length: 12 }, (_, i) => `2024-${String(i + 1).padStart(2, '0')}`);
  const values = labels.map((_, i) => Math.round(20 + 10 * Math.sin(i / 2)));
  const cfg = buildTimeSeriesConfig(labels, values, 'Série temporelle (exemple)');
  if (tsChart) tsChart.destroy();
  tsChart = new Chart(tsCanvas.getContext('2d'), cfg);
}

// Bind buttons
const btnSummary = document.getElementById('load-summary');
btnSummary.addEventListener('click', loadSummary);
const btnHist = document.getElementById('load-hist');
btnHist.addEventListener('click', loadHistogram);

// Initial render
buildExampleTimeSeries();
