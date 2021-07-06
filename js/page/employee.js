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

    clickOutsideDialog(document.querySelector('.dialog-background'), closeDialog);
    // loadData();
    new EmployeeJS();
});

/**
 * Class quản lý các api cho trang Employee
 * Author: HHDang (5/7/2021)
 */
class EmployeeJS extends BaseJS {
    constructor() {
        super();
    }

    setDataUrl() {
        this.dataUrl = "http://cukcuk.manhnv.net/v1/Employees";
    }

    /**
     * Load dữ liệu
     * Author: HHDang (5/7/2021)
     */
    loadData() {
        try {
            $('table tbody').empty();
            // Lấy thông tin các cột dữ liệu
            var ths = $('table thead th');
            // console.log(ths);
            // console.log(fieldNames);

            // Lấy dữ liệu 
            $.ajax({
                url: this.dataUrl,
                method: "GET"
            }).done(function(res) {
                $.each(res, function(index, obj) {
                    var tr = `<tr></tr>`
                    $.each(ths, function(index, th) {
                        var td = `<td><div><span></span></div></td>`
                        var fieldName = $(th).attr('fieldName')
                        var formatType = $(th).attr('formatType')
                        var value = obj[fieldName];
                        switch (formatType) {
                            case "ddmmyyyy":
                                value = formatDate(value);
                                break;
                            case "MoneyVND":
                                value = formatMoney(value);
                                break;
                            default:
                                break;
                        }
                        td = $(td).append(value);
                        tr = $(tr).append(td);
                    })
                    $('table tbody').append(tr);
                })
            }).fail(function(err) {
                console.log(err);
            })
        } catch (err) {
            console.log(err);
        }

    }

    /**
     * Thêm mới dữ liệu
     * Author: HHDang (5/7/2021)
     */
    add() {

    }

    /**
     * Cập nhật dữ liệu
     * Author: HHDang (5/7/2021)
     */
    edit() {

    }

    /**
     * Xóa dữ liệu
     * Author: HHDang (5/7/2021)
     */
    delete() {

    }
}

/**
 * Đóng dialog
 * Author: HHDang (5/7/2021)
 */
function closeDialog() {
    $('.dialog').removeClass('show');
    $('.dialog-background').removeClass('show')
    $('.dialog-background').addClass('hidden');;
    $('.dialog').addClass('hidden');
}

/**
 * Hiện dialog
 * Author: HHDang (5/7/2021)
 */
function showDialog() {
    $('.dialog-background').removeClass('hidden');
    $('.dialog-background').addClass('show');
    $('.dialog').removeClass('hidden');
    $('.dialog').addClass('show');
}

/**
 * Ẩn hiện sidebar
 * Author: HHDang (5/7/2021)
 */
function toggleSitebar() {
    $('.btn-toggle-navbar').click(() => {
        if ($('.navbar').width() == 220) {
            $('.navbar').width(52);
            $('.content').css('left', '68px')
            $('.nav-item-text').hide();
        } else {
            $('.navbar').width(220)
            $('.content').css('left', '221px')
            $('.nav-item-text').fadeIn('slow');
        }
    })
}

/**
 * Đóng dialog khi click ra bên ngoài dialog
 * Author: HHDang (5/7/2021)
 */
function clickOutsideDialog(el, handler) {
    window.addEventListener('click', function(e) {
        if (e.target == el) {
            handler();
        }
    })
}