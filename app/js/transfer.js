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