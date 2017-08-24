QUnit.test( "Test callGetTransactionHistory", function(assert){
    var accountId = 5;
    var offset = 0;
    var limit = 10;
    mockResponse('/dashboard/transaction/' + accountId +"?offset="+offset+"&limit="+limit, '{"transactionHistories":[{"id":"13","eventId":"13","transactionDate":1502415573000,"account":null,"transactionType":"BILL_PAYMENT","amount":500,"balance":20300,"remark":"Bill for electric"},{"id":"12","eventId":"12","transactionDate":1502327481000,"account":null,"transactionType":"DEPOSIT","amount":20000,"balance":20800,"remark":"Deposit cash"},{"id":"11","eventId":"11","transactionDate":1502247600000,"account":null,"transactionType":"TRANSFER","amount":200,"balance":800,"remark":"Transfer mock"},{"id":"10","eventId":"10","transactionDate":1502167173000,"account":null,"transactionType":"WITHDRAW","amount":700,"balance":1000,"remark":"Withdraw cash"},{"id":"9","eventId":"9","transactionDate":1502086833000,"account":null,"transactionType":"DEPOSIT","amount":800,"balance":1700,"remark":"Deposit cash"},{"id":"8","eventId":"8","transactionDate":1502026773000,"account":null,"transactionType":"WITHDRAW","amount":300,"balance":900,"remark":"Withdraw cash"},{"id":"7","eventId":"7","transactionDate":1501914753000,"account":null,"transactionType":"DEPOSIT","amount":1000,"balance":1200,"remark":"Deposit cash"},{"id":"6","eventId":"6","transactionDate":1501828053000,"account":null,"transactionType":"TRANSFER","amount":100,"balance":200,"remark":"Transfer mock"},{"id":"5","eventId":"5","transactionDate":1501749573000,"account":null,"transactionType":"WITHDRAW","amount":200,"balance":300,"remark":"Withdraw cash"},{"id":"4","eventId":"4","transactionDate":1501659573000,"account":null,"transactionType":"WITHDRAW","amount":100,"balance":500,"remark":"Withdraw cash"}],"total":11}');
    $('#qunit-fixture').append('<table id="transactionTable" class="table"> <thead class="mdb-color darken-3"></thead><tbody></tbody></table>');
    
    callGetTransactionHistory( accountId, offset, limit );

    assert.equal($('#transactionTable tbody tr').length,10,'trans appear');
} )


