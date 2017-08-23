QUnit.test( "Test buildChartDataSet", function( assert ) {
  var mockResponseJson = '{"transactionTypes":[{"type":"BILL_PAYMENT","summaryAmount":500},{"type":"DEPOSIT","summaryAmount":22300},{"type":"TRANSFER","summaryAmount":300},{"type":"WITHDRAW","summaryAmount":1300}]}';

  var actualChartDataSet = buildChartDataSet( $.parseJSON( mockResponseJson ).transactionTypes );

  assert.deepEqual( actualChartDataSet.labels, ["BILL_PAYMENT", "DEPOSIT", "TRANSFER", "WITHDRAW"], "Check Labels array." );
  assert.deepEqual( actualChartDataSet.data, [500,22300,300,1300], "Check Data array." );
  assert.deepEqual( actualChartDataSet.backgroundColor, ["#3B6BD3","#26D0B4","#FDB45C","#F7464A"], "Check BackgroundColor array." );
  assert.deepEqual( actualChartDataSet.hoverBackgroundColor, ["#628BE4","#64ECD5","#FFC870","#FF5A5E"], "Check HoverBackgroundColor array." );
  
});

QUnit.test( "Test render Chart" , function(assert){
  $('#qunit-fixture').append('<canvas id="pieChart"></canvas>');
  var responseFromBackend = '{"transactionTypes":[{"type":"BILL_PAYMENT","summaryAmount":500},{"type":"DEPOSIT","summaryAmount":22300},{"type":"TRANSFER","summaryAmount":300},{"type":"WITHDRAW","summaryAmount":1300}]}';
  
  renderChart( "pieChart", "pie", $.parseJSON( responseFromBackend ).transactionTypes );

  assert.equal($('.chartjs-hidden-iframe').length,1,'piechart appear');
});
