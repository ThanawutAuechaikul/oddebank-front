//QUnit.test( "hello test", function( assert ) {
//  assert.ok( 1 == "1", "Passed!" );
//});
//
//
//
//QUnit.test("prettydate basics", function( assert ) {
//    var now = "2008/01/28 22:25:00";
//    assert.equal(prettyDate(now, "2008/01/28 22:24:30"), "just now");
//    assert.equal(prettyDate(now, "2008/01/28 22:23:30"), "1 minute ago");
//    assert.equal(prettyDate(now, "2008/01/28 21:23:30"), "1 hour ago");
//    assert.equal(prettyDate(now, "2008/01/27 22:23:30"), "Yesterday");
//    assert.equal(prettyDate(now, "2008/01/26 22:23:30"), "2 days ago");
//    assert.equal(prettyDate(now, "2007/01/26 22:23:30"), undefined);
//});

QUnit.test( "hello test 2", function( assert ) {
  var responseFromBackend = '{"transactions": [ {"transactionName": "withdraw", "transactionValue": 2000},{"transactionName": "Deposit", "transactionValue": 1000}, {"transactionName": "Transfer", "transactionValue": 3000},{"transactionName": "Bill", "transactionValue": 4000}]}';

  //build chartDataSet object
  var chartDataSet = buildChartDataSet( responseFromBackend );

  assert.equal( chartDataSet.labels.length, 4, "Labels built correctly" );
  assert.equal( chartDataSet.data.length, 4, "Data built correctly" );
  assert.equal( chartDataSet.backgroundColor.length, 4, "backgroundColor built correctly" );
  assert.equal( chartDataSet.hoverBackgroundColor.length, 4, "hoverBackgroundColor built correctly" );
});




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