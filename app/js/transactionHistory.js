function callGetTransactionHistory( accountId, offset, limit ){
    makeGETRequest( '/dashboard/transaction/' + accountId +"?offset="+offset+"&limit="+limit, '', renderTransactionHistoryTable);
}

function renderTransactionHistoryTable(data){
    console.log(data);
    $("#transactionTable tbody tr").remove();   
    var tableBody = $("#transactionTable tbody");
    $.each(data.transactionHistories, function(index, item){
        tableBody.append("<tr><td>"+ item.transactionDate+"</td><td>"+ item.transactionType+"</td><td>"+ item.amount+"</td><td>"+ item.balance+"</td><td>"+ item.remark+"</td></tr>");

    })
}

var currentPage = 1;
function renderTransactionHistory( totalTrans ){
        var maxItemsAPage = 10;
        var totalPage = Math.ceil(totalTrans/maxItemsAPage);

        window.pagObj = $('#pagination').twbsPagination({
            totalPages: totalPage,
            visiblePages: maxItemsAPage,
            onPageClick: function (event, page) {
                currentPage = page;
                callGetTransactionHistory(accountId, (page-1)*10, 10);
            }
        })
    
}

