QUnit.test( "Test format number", function( assert ) {

  assert.equal(formatNumberDisplay( "12345.50" ), "12,345.50");
  assert.equal(formatNumberDisplay( "987.00" ), "987.00");
  assert.equal(formatNumberDisplay( "1234" ), "1,234.00");
  assert.equal(formatNumberDisplay( "1234567" ), "1,234,567.00");

});
