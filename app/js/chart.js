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
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var index = tooltipItem.index;
                        var text = data.labels[index] + ": " + dataFormatUtil.formatCurrency(data.datasets[0].data[index]);
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







