$(document).ready(function() {
    toggleSitebar();
    $('.btn-add-emp').click(() => {
        showDialog();
    })
    $('.btn-close-dialog .btn-close').click(() => {
        closeDialog();
    })
    $('.dialog-footer .btn-cancel').click(() => {
        closeDialog();
    })
});

function closeDialog() {
    $('.dialog').removeClass('show');
    $('.dialog-background').removeClass('show')
    $('.dialog-background').addClass('hidden');;
    $('.dialog').addClass('hidden');
}

function showDialog() {
    $('.dialog-background').removeClass('hidden');
    $('.dialog-background').addClass('show');
    $('.dialog').removeClass('hidden');
    $('.dialog').addClass('show');
}

// Toggle sitebar in out
function toggleSitebar() {
    $('.btn-toggle-navbar').click(() => {
        if ($('.navbar').width() == 220) {
            $('.navbar').width(52);
            $('.content').css('left', '68px')
            $('.nav-item-text').hide();
        } else {
            $('.navbar').width(220)
            $('.content').css('left', '221px')
            setTimeout(function() {
                $('.nav-item-text').show();
            }, 350);
        }
    })
}

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