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
 * CreatedBy: HHDang (5/7/2021)
 */
class EmployeeJS extends BaseJS {
    constructor() {
        super();
    }

    /**
     * Load dữ liệu
     * CreatedBy: HHDang (5/7/2021)
     */
    loadData() {
        // Lấy thông tin các cột dữ liệu
        var ths = $('table thead th');
        // console.log(ths);
        var fieldNames = [];
        $.each(ths, function(index, item) {
            fieldNames.push($(item).attr('fieldName'))
                // console.log($(item).attr('fieldName'))
        })
        console.log(fieldNames);

        // Lấy dữ liệu 
        $.ajax({
            url: "http://cukcuk.manhnv.net/v1/Employees",
            method: "GET"
        }).done(function(res) {
            $.each(res, function(index, item) {
                var tr = `<tr></tr>`
                $.each(ths, function(index, item) {
                    var td = `<td><div><span>test</span></div></td>`
                    tr = $(tr).append(td);
                })
                $('table tbody').append(tr);
            })
        }).fail(function(err) {
            console.log(err);
        })
    }

    /**
     * Thêm mới dữ liệu
     * CreatedBy: HHDang (5/7/2021)
     */
    add() {

    }

    /**
     * Cập nhật dữ liệu
     * CreatedBy: HHDang (5/7/2021)
     */
    edit() {

    }

    /**
     * Xóa dữ liệu
     * CreatedBy: HHDang (5/7/2021)
     */
    delete() {

    }
}


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
            $('.nav-item-text').fadeIn('slow');
        }
    })
}

//close dialog when click outside 
function clickOutsideDialog(el, handler) {
    window.addEventListener('click', function(e) {
        if (e.target == el) {
            handler();
        }
    })
}