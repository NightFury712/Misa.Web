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
            $('.navbar').width(68);
            $('.header').width('calc(100% - 69px)')
            $('.content').width('calc(100% - 101px)')
            $('.nav-item-text').hide();
            $('.logo-box .amis-logo').hide();
        } else {
            $('.navbar').width(220)
            $('.header').width('calc(100% - 221px)')
            $('.content').width('calc(100% - 253px)')
            setTimeout(function() {
                $('.nav-item-text').show();
                $('.logo-box .amis-logo').show();
            }, 400);
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