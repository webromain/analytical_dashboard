// Minimal DOM/config tests without Jest
import fs from 'fs';
import path from 'path';
import url from 'url';
import { buildBarChartConfig, buildTimeSeriesConfig } from '../src/charts/config.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function assert(cond, msg){ if(!cond){ throw new Error(msg || 'Assertion failed'); } }

// Test config builders
const barCfg = buildBarChartConfig(['A','B'], [10,20], 'Test');
assert(barCfg.type === 'bar', 'bar type');
assert(barCfg.data.labels.length === 2, 'labels length');

const tsCfg = buildTimeSeriesConfig(['2024-01','2024-02'], [1,2], 'TS');
assert(tsCfg.type === 'line', 'line type');

// Test HTML contains required elements
const indexPath = path.resolve(__dirname, '..', 'index.html');
const html = fs.readFileSync(indexPath, 'utf-8');
assert(html.includes('id="histCanvas"'), 'histCanvas exists');
assert(html.includes('id="tsCanvas"'), 'tsCanvas exists');

console.log('Frontend tests passed.');
