var accountId = 5;

function showNoTransaction(){
    $('#transactionTable').append($("<tr/> <td colspan='5' style='text-align: center;'><h4>  There is no transaction. </h4></td>"));
}

function callGetAccountSummary(accountId){
    makeGETRequest('/account/summary/'+ accountId, '', drawAccountSummary);
}

function buildChart( chartElementId, chartType, accountId ){
    makeGETRequest( '/dashboard/piechart/'+ accountId, '', function ( data ){ renderChart( chartElementId, chartType, data ) } );
}

function buildDashboardPage( accountId ){
    makeGETRequest( 'dashboard/transaction/count/'+ accountId, '', function ( totalCountTransaction ){ 
        var isShow = totalCountTransaction!=0;
        if( isShow )
		{
            buildTransactionHistoryTable( totalCountTransaction, accountId );
            buildChart( "pieChart", "pie", accountId );
		}else
		{
            showNoTransaction();
		}
    } );
}

function drawAccountSummary(accountSummary){
    var balance = dataFormatUtil.formatCurrency(accountSummary.balance);
    $('.accounSummary').append('<div class="card"> ' +
    '<div class="card-header">' +
        'Account Summary </div>' + 
    '<div class="card-block"><p class="card-text"> Account Number : <span id="accountNumber">' + accountSummary.accountNumber +'</span></p>' + 
        '<p class="card-text" >Balance (THB) : <span id="accountBalance">' + balance + '</span></p></div></div>');    
}



