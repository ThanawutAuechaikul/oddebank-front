QUnit.test( "Test buildChartDataSet", function( assert ) {
  $('#qunit-fixture').append('<div class="accounSummary"></div>');
  var mockResponseObj = {accountNumber: "4558874856", balance: 2600};
  
  drawAccountSummary( mockResponseObj );

  assert.equal($('#accountNumber').length,1,'Account Number was shown');
  assert.equal($('#accountNumber')[0].innerText, '4558874856' , 'Account Number is correct');

  assert.equal($('#accountBalance').length,1,'Account Balance was shown');
  assert.equal($('#accountBalance')[0].innerText, '2,600.00' , 'Account Balance is correct');

});
