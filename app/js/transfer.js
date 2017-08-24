makeGETRequest('user/' + '1' + '/accounts', '', loadAccountList);
var accounts;
function loadAccountList(accountList) {
    accounts = accountList;
    for (var i=0; i<accountList.length; i++) {
        $('#fromAccount').append("<option value=" + i + ">" +
            formatAccountDisplay(accountList[i].accountNumber) + " (" + formatNumberDisplay(accountList[i].balance) +
            ")</option>");
    }
}

function formatNumberDisplay(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatAccountDisplay(x) {
    return x.replace(/(\d{3})(\d{3})(\d{3})(\d{1})/, "$1-$2-$3-$4");
}


function checkSubmitBtn(){

    if($('#toAccount').val().length == 10 && $('#amount').val()>0 && $('#amount').val() <= accounts[$('#fromAccount').val()].balance){
        $('#submitBtn').prop('disabled', false);
    }else{
        $('#submitBtn').prop('disabled', true);
    }
}

function formatNumber(x){
    x.value = parseFloat(x.value).toFixed(2);
}

function buildVerifyTransfer() {
    var tranferRequest = new Object();
    tranferRequest.srcAccount = accounts[$('#fromAccount').val()].accountNumber;
    tranferRequest.destAccount = $('#toAccount').val();
    tranferRequest.amount = $('#amount').val();
    tranferRequest.remark = $('#remark').val();

    return JSON.stringify(tranferRequest);
}

$("#submitBtn").click(function(){
    var jsonObj = buildVerifyTransfer();
    makePOSTRequest('verify', jsonObj, navigateToPreview);

});

function navigateToPreview(message){
    localStorage.setItem("transferSession",JSON.stringify(message));
    $("#transferForm").submit();
}

function getTransferSessionData() {
    var transferObj = JSON.parse(localStorage.getItem("transferSession"));
    $('#sourceAccount').html(transferObj.transferReceipt.finalSourceAccount.fullName + "<br/>");
    $('#sourceAccount').append(formatAccountDisplay(transferObj.transferReceipt.finalSourceAccount.accountNumber));
    $('#toAccount').html(transferObj.transferReceipt.finalDestinationAccount.fullName + "<br/>");
    $('#toAccount').append(formatAccountDisplay(transferObj.transferReceipt.finalDestinationAccount.accountNumber));
    $('#amount').html(formatNumberDisplay(transferObj.transferReceipt.transferAmount));
    $('#remark').html(transferObj.transferReceipt.srcRemark);
}

$('#cancelBtn').click(function () {
    $('#previewTransferForm').attr("action","transfer.html");
    $('#previewTransferForm').submit();
});

$('#confirmBtn').click(function () {
    var submitObject = buildSubmitObject();
    makePOSTRequest('transfer', submitObject, navigateToSummary);
});

function buildSubmitObject() {
    var transferObj = JSON.parse(localStorage.getItem("transferSession"));
    var tranferRequest = new Object();
    tranferRequest.srcAccount = transferObj.transferReceipt.finalSourceAccount.accountNumber;
    tranferRequest.destAccount = transferObj.transferReceipt.finalDestinationAccount.accountNumber;
    tranferRequest.amount = transferObj.transferReceipt.transferAmount;
    tranferRequest.remark = transferObj.transferReceipt.srcRemark;

    return JSON.stringify(tranferRequest);
}

function navigateToSummary(message) {
    localStorage.setItem("transferSession",JSON.stringify(message));
    $('#previewTransferForm').attr("action","transferSummary.html");
    $("#previewTransferForm").submit();
}