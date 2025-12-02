export function buildBarChartConfig(labels, values, label = 'Histogram') {
  return {
    type: 'bar',
    data: {
      labels,
      datasets: [{ label, data: values, backgroundColor: '#60a5fa' }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } }
    }
  };
}

export function buildTimeSeriesConfig(labels, values, label = 'Time Series') {
  return {
    type: 'line',
    data: { labels, datasets: [{ label, data: values, borderColor: '#34d399' }] },
    options: { responsive: true, scales: { y: { beginAtZero: true } } }
  };
}
