class BaseJS {
    constructor() {
        this.dataUrl = null;
        this.setDataUrl();
        this.loadData();
        this.loadDataDepartment();
        this.loadDataPosition();
        this.initEvents();
    }


    //#region Method
    initEvents() {
        let mine = this;
        let EmployeeId;

        toggleSitebar();
        $('.btn-add-emp').on('click', function () {
            $('#btnSave').addClass('add-new-employee');
            $('.dialog-footer .btn-cancel').removeClass('delete-employee');
            $('.dialog-footer .btn-cancel').text('Hủy')
            $('#btnSave span').text('Lưu');
            $.each($('.emp-info-general-item'), (index, formaddItem) => {
                $(formaddItem).find('input').first().val('')
            })

            toggleDialog();
        })

        $('.btn-close-dialog .btn-close').click(function () {
            toggleDialog();
        })

        $('.dialog-footer .btn-cancel').click(() => {
            if ($('.dialog-footer .btn-cancel').hasClass('delete-employee')) {
                const flag = window.confirm("Bạn có chắc muốn xóa nhân viên này?");
                if (flag) {
                    mine.delete(EmployeeId);
                }
            }
            toggleDialog();
        })

        clickOutsideDialog(document.querySelector('.dialog-background'), toggleDialog);

        // Thực hiện load dữ liệu khi nhấn button nạp
        $('#btnRefresh').click(function () {
            mine.loadData();
        })

        // Thực hiện lưu dữ liệu khi nhấn button [Lưu] trên form chi tiết
        $('#btnSave').click(function () {
            // Validate dữ liệu:
            var inputValidates = $('input[required], input[type=email], #nbPhoneNumber');
            $.each(inputValidates, (index, input) => {
                $(input).trigger('blur');
            })
            let inputNotValids = $('input[validate=false]');
            if (inputNotValids && inputNotValids.length > 0) {
                alert("Dữ liệu không hợp lệ vui lòng kiểm tra lại.")
                inputNotValids[0].focus();
                return;
            }
            const employee = mine.getPersonInfo();

            // console.log(employee);
            if ($(this).hasClass('add-new-employee')) {
                mine.add(employee);
            } else {
                // console.log("heello");
                mine.edit(EmployeeId, employee);
            }
        })

        // Hiển thị thông tin chi tiết khi nhấn đúp chuột chọn 1 bản ghi trên danh sách dữ liệu
        $('table tbody').on('dblclick', 'tr', function () {
            // alert(1);
            $('#btnSave').removeClass('add-new-employee');
            $('.dialog-footer .btn-cancel').addClass('delete-employee')
            $('.dialog-footer .btn-cancel').text('Xóa')
            $('#btnSave span').text('Lưu thay đổi');
            let trSiblings = $(this).siblings();
            trSiblings.removeClass('row-selected');
            $(this).addClass('row-selected');
            EmployeeId = $(this).attr('EmployeeId');
            toggleDialog();
            $.ajax({
                url: `${mine.dataUrl}/${EmployeeId}`,
                method: "GET"
            }).done(function (res) {
                mine.insertDialogInfo(res)
                // $('#btnSave span').text('Lưu thay đổi');
            }).fail(function (err) {
                console.log(err);
            })
        })

        /**
         * Validate bắt buộc nhập
         * Author: HHDang (6/7/2021)
         */
        $('[required]').blur(function () {
            // Kiểm tra dữ liệu đã nhập, nếu trống thì cảnh báo
            let value = $(this).val();
            if (!value) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Trường này không được phép để trống');
                $(this).attr('validate', false);
            } else {
                $(this).removeClass('border-red');
                $(this).attr('title', '')
                $(this).attr('validate', true);
            }
        })

        /**
         * Validate email hợp lệ
         * Author: HHDang (6/7/2021)
         */
        $('input[type=email]').blur(function () {
            let value = $(this).val();
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(String(value).toLowerCase())) {
                $(this).removeClass('border-red');
                $(this).attr('title', '')
                $(this).attr('validate', true);
            } else {
                $(this).addClass('border-red');
                $(this).attr('title', 'Email không hợp lệ')
                $(this).attr('validate', false);
            }
        })

        /**
         * Validate số điện thoại
         * Author: HHDang (6/7/2021)
         */
        $('#nbPhoneNumber').blur(function () {
            let value = $(this).val();
            const regx = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
            if (regx.test(value)) {
                $(this).removeClass('border-red');
                $(this).attr('title', '')
                $(this).attr('validate', true);
            } else {
                $(this).addClass('border-red');
                $(this).attr('title', 'Số điện thoại không hợp lệ')
                $(this).attr('validate', false);
            }
        })

        /**
         * Thêm sự kiện nhấn phím esc đóng dialog
         * Author: HHDang (8/7/2021)
         */
        $(document).on('keydown', function (e) {
            // keyCode của phím esc là 27
            if (e.keyCode === 27) {
                $('.dialog-background').removeClass('show');
                $('.dialog-background').addClass('hidden');
                $('.dialog').removeClass('show');
                $('.dialog').addClass('hidden');
            }
        })
    }

    //#endregion

    /**
     * Truyền dữ liệu về thông tin nhân viên vào form thông tin
     * Author: HHDang (8/7/2021)
     * @param {thông tin nhân viên trả về theo id} res 
     */
    insertDialogInfo(res) {
        console.log('parent insertDialogInfo: ' + res)
    }

    /**
     * Tạo đối tượng chứa thông tin nhân viên lấy từ form
     * Author: HHDang (8/7/2021)
     * @returns obj chứa thông tin nhân viên 
     */
    getPersonInfo() {
    }

    setDataUrl() {

    }

    /**
     * Load dữ liệu
     * CreatedBy: HHDang (5/7/2021)
     */
    loadData() {
        try {
            $('table tbody').empty();
            // Lấy thông tin các cột dữ liệu
            var ths = $('table thead th');

            // Lấy dữ liệu 
            $.ajax({
                url: this.dataUrl,
                method: "GET"
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = `<tr  EmployeeId=${obj.EmployeeId}></tr>`
                    $.each(ths, function (index, th) {
                        var fieldName = $(th).attr('fieldName')
                        var formatType = $(th).attr('formatType')
                        var td = `<td></td>`
                        // console.log(fieldName);
                        var value = obj[fieldName];
                        switch (formatType) {
                            case "ddmmyyyy":
                                value = formatDate(value, 1);
                                break;
                            case "MoneyVND":
                                td = `<td class></td>`
                                value = formatMoney(value);
                                break;
                            case "gender":
                                value = formatGender(value, 1);
                                break;
                            case "workstatus":
                                value = formatWorkstatus(value, 1);
                                break;
                            default:
                                break;
                        }
                        td = $(td).append(value);
                        tr = $(tr).append(td);
                    })
                    $('table tbody').append(tr);
                    // if(index == 10) return;
                })
            }).fail(function (err) {
                console.log(err);
            })
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Load dữ liệu phòng ban
     * Author: HHDang (6/7/2021)
     */
    loadDataDepartment() {

    }

    /**
     * Load dữ liệu vị trí công việc
     * Author: HHDang (8/7/2021)
     */
    loadDataPosition() {

    }

    /**
     * Thêm mới dữ liệu
     * CreatedBy: HHDang (5/7/2021)
     */
    add(employee) {
        let mine = this;
        // Post dữ liệu
        $.ajax({
            url: "http://cukcuk.manhnv.net/v1/Employees",
            method: "POST",
            data: JSON.stringify(employee),
            contentType: 'application/json'
        }).done(function (res) {
            // Sau khi lưu thành công
            // + Thông báo thành công
            alert('Lưu thành công');
            // + Ẩn form
            toggleDialog();
            // + load lại dữ liệu
            mine.loadData();
        }).fail(function (err) {
            console.log(err);
        })
    }

    /**
     * Cập nhật dữ liệu
     * CreatedBy: HHDang (5/7/2021)
     */
    edit(EmployeeId, employee) {
        let mine = this;
        $.ajax({
            url: `${this.dataUrl}/${EmployeeId}`,
            method: "PUT",
            data: JSON.stringify(employee),
            contentType: 'application/json'
        }).done(function (res) {
            // Sau khi lưu thành công
            // + Thông báo thành công
            alert('Lưu thay đổi thành công');
            // + Ẩn form
            toggleDialog();
            // + load lại dữ liệu
            mine.loadData();
            console.log(res);
        }).fail(function (err) {
            console.log((err))
        })
    }

    /**
     * Xóa dữ liệu
     * Author: HHDang (8/7/2021)
     */
    delete(EmployeeId) {
        let mine = this;
        $.ajax({
            url: `${this.dataUrl}/${EmployeeId}`,
            method: "DELETE"
        }).done(function (res) {
            alert("Xóa thành công!!!");
            mine.loadData();
            console.log(res);
        }).fail(function (err) {
            console.log(err);
        })

    }
}


/**
 * Ẩn hiện dialog
 * Author: HHDang (5/7/2021)
 */
 function toggleDialog() {
    $('.dialog-background').toggleClass('hidden show');
    $('.dialog').toggleClass('hidden show');
    if ($('.dialog').hasClass('show')) {
        $('input').removeClass('border-red');
        setTimeout(() => {
            $('#txtEmployeeCode').focus();
        }, 300)
    }

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
    window.addEventListener('click', function (e) {
        if (e.target == el) {
            handler();
        }
    })
}