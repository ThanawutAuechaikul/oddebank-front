var colorDict = {
  "deposit": { "backgroundColor":"#26D0B4", "hoverBackgroundColor": "#64ECD5" },
  "withdraw": { "backgroundColor":"#F7464A", "hoverBackgroundColor": "#FF5A5E" },
  "transfer": { "backgroundColor":"#FDB45C", "hoverBackgroundColor": "#FFC870" },
  "bill": { "backgroundColor":"#3B6BD3", "hoverBackgroundColor": "#628BE4" }
};

function renderChart( chartElementId, chartType, responseFromBackend )
{
    drawChart( chartElementId, chartType, buildChartDataSet( $.parseJSON( responseFromBackend ).transactions ) );
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
            responsive: true
        }
    });
}

function buildChartDataSet( trans )
{
     var labels = [], data = [], backgroundColor = [], hoverBackgroundColor = [];
     $.each(trans, function(index, item) {
           labels.push(item.transactionName);
           data.push(item.transactionValue);
           backgroundColor.push( colorDict[ item.transactionName.toLowerCase() ].backgroundColor );
           hoverBackgroundColor.push( colorDict[ item.transactionName.toLowerCase() ].hoverBackgroundColor );
      })

     var chartDataSet = { labels: labels, data: data, backgroundColor: backgroundColor, hoverBackgroundColor: hoverBackgroundColor};
     return chartDataSet;
}







