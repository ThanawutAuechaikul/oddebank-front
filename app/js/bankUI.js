var accountId = 5;


function drawTable(data){
    for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
        drawRow(data[i]);
    }
}



function drawRow(rowData){
    var row = $("<tr />");
    $('.transactionTable').append(row);
    row.append($("<td>" + rowData.datetime + "</td>"));
    row.append($("<td>" + rowData.transactionType + "</td>"));
    row.append($("<td>" + rowData.amount + "</td>"));
    row.append($("<td>" + rowData.balance + "</td>"));
    row.append($("<td>" + rowData.remark + "</td>"));
}

var transactionData = [{
    datetime:'August 21,2017 10:12:13',
    transactionType:'Deposit',
    amount:'1,000',
    balance:'123,456',
    remark:''
},
{
    datetime:'August 21,2017 10:12:13',
    transactionType:'Deposit',
    amount:'1,000',
    balance:'123,456',
    remark:''
},
{
    datetime:'August 21,2017 10:12:13',
    transactionType:'Deposit',
    amount:'1,000',
    balance:'123,456',
    remark:''
}];

drawTable(transactionData);

function callGetAccountSummary(accountId){
    makeGETRequest('/account/summary/'+ accountId, '', drawAccountSummary);
}

function callGetChartData( chartElementId, chartType, accountId ){
    makeGETRequest( '/dashboard/piechart/'+ accountId, '', function ( data ){ renderChart( chartElementId, chartType, data ) } );
}






function drawAccountSummary(accountSummary){
    var balance = dataFormatUtil.formatCurrency(accountSummary.balance);
    $('.accounSummary').append('<div class="card"> ' +
    '<div class="card-header">' +
        'Account Summary </div>' + 
    '<div class="card-block"><p class="card-text"> Account Number : <span id="accountNumber">' + accountSummary.accountNumber +'</span></p>' + 
        '<p class="card-text" >Balance : <span id="accountBalance">' + balance + '</span></p></div></div>');    
}



