function callGetTransactionHistory( accountId, offset, limit ){
    makeGETRequest( '/dashboard/transaction/' + accountId +"?offset="+offset+"&limit="+limit, '', renderTransactionHistoryTable);
}

function renderTransactionHistoryTable(data){
    $("#transactionTable tbody tr").remove();   
    var tableBody = $("#transactionTable tbody");
    $.each(data.transactionHistories, function(index, item){
        var amount = dataFormatUtil.formatCurrency(item.amount);
        var balance = dataFormatUtil.formatCurrency(item.balance);
        var date = dataFormatUtil.formatDate(item.transactionDate);

        tableBody.append("<tr><td>"+ date+"</td><td class='"+item.transactionType+"'>"+ item.transactionType+"</td><td class='currency "+item.transactionType+"'>"+ amount+"</td><td class='currency'>"+ balance+"</td><td>"+ item.remark+"</td></tr>");

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
                callGetTransactionHistory(accountId, getCalculatedOffsetForPageNumber(page, maxItemsAPage) , maxItemsAPage);
            }
        })
    
}

function getCalculatedOffsetForPageNumber( pageNumber, maxItemsAPage )  
{
    return ( pageNumber - 1 ) * maxItemsAPage;
}

