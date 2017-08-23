var ctxP = document.getElementById("pieChart").getContext('2d');
var myPieChart = new Chart(ctxP, {
    type: 'pie',
    data: {
        labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
        datasets: [
            {
                data: [300, 50, 100, 40, 120],
                backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
            }
        ]
    },
    options: {
        responsive: true
    }    
});


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
    makeRequest('/accountSummary/accountId/'+ accountId, '', drawAccountSummary , 'GET');
}


function drawAccountSummary(data){
    $('.accounSummary').append('<div class="panel panel-primary"> ' +
                                    '<div class="panel-heading">' +
                                        '<h3 class="panel-title"> Account Summary </h3> </div>' + 
                                    '<div class="panel-body"> Account Number : ' + data.accountNumber +'</br>' + 
                                        'Balance : ' + data.balance + '</div></div>');                     
    console.log(data);

}



