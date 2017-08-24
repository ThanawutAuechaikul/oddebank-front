makeGETRequest('user/' + '1' + '/accounts', '', loadAccountList);
var fromAmount;
function loadAccountList(accountList) {
    for (var i=0; i<accountList.length; i++) {
        $('#fromAccount').append("<option value=" + accountList[i].id + ">" +
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