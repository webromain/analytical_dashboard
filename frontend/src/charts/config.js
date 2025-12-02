(function(root, factory){
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ChartConfigBuilder = factory();
  }
})(typeof self !== 'undefined' ? self : this, function(){
  function buildBarChartConfig(labels, values, label='Histogram'){
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
  function buildTimeSeriesConfig(labels, values, label='Time Series'){
    return {
      type: 'line',
      data: { labels, datasets: [{ label, data: values, borderColor: '#34d399' }] },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    };
  }
  return { buildBarChartConfig, buildTimeSeriesConfig };
});

// ESM re-export for browser modules
export const { buildBarChartConfig, buildTimeSeriesConfig } = (typeof ChartConfigBuilder !== 'undefined') ? ChartConfigBuilder : await import(null);
