// Format dữ liệu ngày tháng sang ngày/tháng/năm
function formatDate(date) {
    var date = new Date(date);
    if (Number.isNaN(date.getTime())) {
        return "";
    } else {
        let day = date.getDate()
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        return `${day}/${month}/${year}`;
    }
}

function formatMoney(money) {
    if(money !== null) {
        money = money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "1.")
    }
    return money;
}