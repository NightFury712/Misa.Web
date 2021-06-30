$(document).ready(function() {
    $('.btn-toggle-navbar').click(() => {
        if ($('.navbar').width() == 220) {
            $('.navbar').width(54);
            $('.nav-item-text').hide();
            $('.navbar .navbar-content .toggle-navbar .btn-toggle-navbar .arrow-white')
        } else {
            $('.navbar').width(220)
            setTimeout(function() {
                $('.nav-item-text').show();
            }, 400);
        }
        // $('.navbar').style.width
    })
});


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