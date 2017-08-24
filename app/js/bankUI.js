var accountId = 5;


function drawTable(data){
    for (var i = 0; i < data.length; i++) {
        drawRow(data[i]);
    }
}



function drawRow(rowData){
    var row = $("<tr />");
    $('#transactionTable').append(row);
    row.append($("<td>" + rowData.datetime + "</td>"));
    row.append($("<td>" + rowData.transactionType + "</td>"));
    row.append($("<td>" + rowData.amount + "</td>"));
    row.append($("<td>" + rowData.balance + "</td>"));
    row.append($("<td>" + rowData.remark + "</td>"));
}

function showNoTransaction(){
    $('#transactionTable').append($("<tr/> <td colspan='5' style='text-align: center;'><h4>  There is no transaction. </h4></td>"));
}

function callGetAccountSummary(accountId){
    makeGETRequest('/account/summary/'+ accountId, '', drawAccountSummary);
}

function callGetChartData( chartElementId, chartType, accountId ){
    makeGETRequest( '/dashboard/piechart/'+ accountId, '', function ( data ){ renderChart( chartElementId, chartType, data ) } );
}

function buildDashboardPage( accountId ){
    makeGETRequest( 'dashboard/transaction/count/'+ accountId, '', function ( totalCountTransaction ){ 
        var isShow = totalCountTransaction!=0;
        if( isShow )
		{
            renderTransactionHistory( totalCountTransaction, accountId );
            callGetChartData( "pieChart", "pie", accountId );
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



