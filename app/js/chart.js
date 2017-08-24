var colorDict = {
  "deposit": { "backgroundColor":"#26D0B4", "hoverBackgroundColor": "#64ECD5" },
  "withdraw": { "backgroundColor":"#F7464A", "hoverBackgroundColor": "#FF5A5E" },
  "transfer": { "backgroundColor":"#FDB45C", "hoverBackgroundColor": "#FFC870" },
  "bill_payment": { "backgroundColor":"#3B6BD3", "hoverBackgroundColor": "#628BE4" }
};

function renderChart( chartElementId, chartType, responseFromBackend )
{
    drawChart( chartElementId, chartType, buildChartDataSet( responseFromBackend.transactionTypes ) );
}

function drawChart( chartElementId, chartType, chartDataSet )
{
    var ctxP = document.getElementById( chartElementId ).getContext( '2d' );
    var chart = new Chart(ctxP, {
        type: chartType,
        data: {
            labels: chartDataSet.labels,
            datasets: [
                {
                    data: chartDataSet.data,
                    backgroundColor: chartDataSet.backgroundColor,
                    hoverBackgroundColor: chartDataSet.hoverBackgroundColor
                }
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: 'right',
                labels: {
                    generateLabels: function (chart) {
                        var data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            return data.labels.map(function(label, i) {
                                var meta = chart.getDatasetMeta(0);
                                var ds = data.datasets[0];
                                var arc = meta.data[i];
                                var custom = arc && arc.custom || {};
                                var getValueAtIndexOrDefault = Chart.helpers.getValueAtIndexOrDefault;
                                var arcOpts = chart.options.elements.arc;
                                var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
                                var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
                                var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);
    
                                return {
                                    text: label+" (THB): "+dataFormatUtil.formatCurrency(ds.data[i]),
                                    fillStyle: fill,
                                    strokeStyle: stroke,
                                    lineWidth: bw,
                                    hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
    
                                    // Extra data used for toggling the correct item
                                    index: i
                                };
                            });
                        }
                        return [];
                    }
                }
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var index = tooltipItem.index;
                        var text = data.labels[index] + " (THB): " + dataFormatUtil.formatCurrency(data.datasets[0].data[index]);
                        return text;
                    }
                }
            }
        }
    });
}

function buildChartDataSet( trans )
{
     var labels = [], data = [], backgroundColor = [], hoverBackgroundColor = [];
     $.each(trans, function(index, item) {
           labels.push(item.type);
           data.push(item.summaryAmount);
           backgroundColor.push( colorDict[ item.type.toLowerCase() ].backgroundColor );
           hoverBackgroundColor.push( colorDict[ item.type.toLowerCase() ].hoverBackgroundColor );
      })

     var chartDataSet = { labels: labels, data: data, backgroundColor: backgroundColor, hoverBackgroundColor: hoverBackgroundColor};
     return chartDataSet;
}







