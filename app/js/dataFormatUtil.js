
var dataFormatUtil = {
    formatCurrency : function (number) {
        return parseFloat(number).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    },
    formatDate : function (dateTime) {

        return moment(new Date(dateTime)).format("MMMM D, YYYY H:mm:ss");
    }
};