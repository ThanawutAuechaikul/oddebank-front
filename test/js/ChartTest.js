QUnit.test( "Test buildChartDataSet", function( assert ) {
  var mockResponseJson = ' {"transactions": [ {"transactionName": "withdraw", "transactionValue": 2000},{"transactionName": "Deposit", "transactionValue": 1000}, {"transactionName": "Transfer", "transactionValue": 3000},{"transactionName": "Bill", "transactionValue": 4000}]}';

  //build chartDataSet object
  var actualChartDataSet = buildChartDataSet( $.parseJSON( mockResponseJson ).transactions );

  assert.deepEqual( actualChartDataSet.labels, ["withdraw", "Deposit", "Transfer", "Bill"], "Check Labels array." );
  assert.deepEqual( actualChartDataSet.data, [2000, 1000, 3000, 4000], "Check Data array." );
  assert.deepEqual( actualChartDataSet.backgroundColor, ["#F7464A", "#26D0B4", "#FDB45C", "#3B6BD3"], "Check BackgroundColor array." );
  assert.deepEqual( actualChartDataSet.hoverBackgroundColor, ["#FF5A5E", "#64ECD5", "#FFC870", "#628BE4"], "Check HoverBackgroundColor array." );
  
});
