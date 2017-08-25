var accounts;
function loadAccountByUserId() {
    makeGETRequest('user/' + '1' + '/accounts', '', loadAccountList);
}
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

function mapFieldValue(transferObj) {
    $('#fromAccount').html(transferObj.transferSummary.fromAccount.fullName + "<br/>" +
        formatAccountDisplay(transferObj.transferSummary.fromAccount.accountNumber));
    $('#toAccount').html(transferObj.transferSummary.toAccount.fullName + "<br/>" +
        formatAccountDisplay(transferObj.transferSummary.toAccount.accountNumber));
    $('#amount').html(formatNumberDisplay(transferObj.transferSummary.amount));
    $('#remark').html(transferObj.transferSummary.fromRemark);
    $('#balance').html(formatNumberDisplay(transferObj.transferSummary.balance));
}

function getTransferSessionData() {
    var transferObj = JSON.parse(localStorage.getItem("transferSession"));
    mapFieldValue(transferObj);
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
    tranferRequest.srcAccount = transferObj.transferSummary.fromAccount.accountNumber;
    tranferRequest.destAccount = transferObj.transferSummary.toAccount.accountNumber;
    tranferRequest.amount = transferObj.transferSummary.amount;
    tranferRequest.remark = transferObj.transferSummary.fromRemark;

    return JSON.stringify(tranferRequest);
}

function navigateToSummary(message) {
    localStorage.setItem("transferReceiptSession",JSON.stringify(message));
    $('#previewTransferForm').attr("action","transferSummary.html");
    $("#previewTransferForm").submit();
}

function getTransferReceiptSessionData() {
    var transferObj = JSON.parse(localStorage.getItem("transferReceiptSession"));
    mapFieldValue(transferObj);
}