class BaseJS {
    constructor() {
        this.dataUrl = null;
        this.setDataUrl();
        this.loadData();
        this.loadDataDepartment();
        this.loadDataPosition();
        this.loadDataCombobox();
        this.initEvents();
    }

    //#region Method
    initEvents() {
        let mine = this;
        let EmployeeId;

        toggleSitebar();
        $('.btn-add-emp').on('click', function () {
            $('#btnSave').addClass('add-new-employee');
            $('#btnSave span').text('Lưu');
            mine.changePopUpContent({
                type: "warning",
                title: "Đóng form thêm nhân viên",
                content: `Bạn có chắc muốn đóng form nhập <b>"Thông tin chung của nhân viên"</b> hay không?`,
                btnCancel: `Tiếp tục nhập`,
                btnSave: `Đóng`
            })
            $.each($('.emp-info-general-item'), (index, formaddItem) => {
                $(formaddItem).find('input').first().val('')
            })

            toggleDialog();
        })

        $('.btn-close-dialog .btn-close').click(function () {
            // toggleDialog();
            togglePopUp();
        })

        $('.dialog-footer .btn-cancel').click(() => {
            togglePopUp();
        })

        $('.popup-footer .btn-save').click(() => {
            if ($('.popup-footer .btn-save').hasClass('delete-record')) {
                mine.delete(EmployeeId);
                togglePopUp();
            } else {
                toast({
                    message: "Dữ liệu đang nhập sẽ mất khi đóng form!",
                    type: 'warning',
                    duration: 2000
                })
                togglePopUp()
                toggleDialog();
            }
        })

        $('.popup-header .btn-close-popup .btn-close').click(() => {
            togglePopUp();
        })

        $('.popup-footer .btn-cancel').click(() => {
            togglePopUp();
        })

        clickOutsideDialog(document.querySelector('.dialog-background'), togglePopUp);

        // Thực hiện load dữ liệu khi nhấn button nạp
        $('#btnRefresh').click(function () {
            mine.loadData();
        })

        // Thực hiện lọc dữ liệu khi unfocus trường tìm kiếm theo nhân viên
        $(`.select-box-department .select-box-text`).blur(function() {
            mine.filterData();
        })

        $(`.select-box-position .select-box-text`).blur(function() {
            mine.filterData();
        })


        $('.btn-dbclick .btn-modify').click(function () {
            $('#btnSave span').text('Lưu thay đổi');
            $('#btnSave').removeClass('add-new-employee');
            mine.changePopUpContent({
                type: "warning",
                title: "Đóng form thêm nhân viên",
                content: `Bạn có chắc muốn đóng form nhập <b>"Thông tin chung của nhân viên"</b> hay không?`,
                btnCancel: `Tiếp tục nhập`,
                btnSave: `Đóng`
            })
            toggleDialog();
            $.ajax({
                url: `${mine.dataUrl}/${EmployeeId}`,
                method: "GET"
            }).done(async function (res) {
                await mine.insertDialogInfo(res)
            }).fail(function (err) {
                console.log(err);
            })
        })

        $('.btn-dbclick .btn-delete').click(function () {
            mine.changePopUpContent({
                type: "delete",
                title: "Xóa nhân viên",
                content: `Bạn có chắc muốn <b>"xóa nhân viên"</b> hay không?`,
                btnCancel: `Hủy`,
                btnSave: `Xóa`
            })
            togglePopUp();
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
                // alert("Dữ liệu không hợp lệ vui lòng kiểm tra lại.")
                toast({
                    message: "Dữ liệu không hợp lệ!",
                    type: 'error',
                    duration: 2000
                })
                setTimeout(() => {
                    toast({
                        message: "Vui lòng kiểm tra lại!",
                        type: 'error',
                        duration: 2000
                    })
                }, 100)
                inputNotValids[0].focus();
                return;
            }
            const employee = mine.getPersonInfo();

            // console.log(employee);
            if ($(this).hasClass('add-new-employee')) {
                mine.add(employee);
            } else {
                mine.edit(EmployeeId, employee);
            }
        })

        // Hiển thị thông tin chi tiết khi nhấn đúp chuột chọn 1 bản ghi trên danh sách dữ liệu
        $('table tbody').on('dblclick', 'tr', function (e) {
            // alert(1);
            let trSiblings = $(this).siblings();
            trSiblings.removeClass('row-selected');
            $(this).addClass('row-selected');
            EmployeeId = $(this).attr('EmployeeId');
            $('.btn-dbclick').css({ "top": e.pageY, "left": e.pageX });
            $('.btn-dbclick').show();
        })

        /**
         * Validate bắt buộc nhập
         * Author: HHDang (6/7/2021)
         */
        $('[required]').blur(function () {
            // Kiểm tra dữ liệu đã nhập, nếu trống thì cảnh báo
            let value = $(this).val();
            let tooltip = $(this).parent().find('.tooltiptext');
            if (!value) {
                $(this).addClass('border-red');
                tooltip.show()
                tooltip.text('Trường này không được phép để trống')
                // console.log($(this).parent().find('.tooltiptext').text('Trường này không được phép để trống'));
                // $(this).attr('title', 'Trường này không được phép để trống');
                $(this).attr('validate', false);
            } else {
                $(this).removeClass('border-red');
                tooltip.hide();
                $(this).attr('validate', true);
            }
        })

        /**
         * Validate email hợp lệ
         * Author: HHDang (6/7/2021)
         */
        $('input[type=email]').blur(function () {
            let value = $(this).val();
            let tooltip = $(this).parent().find('.tooltiptext');
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(String(value).toLowerCase())) {
                $(this).removeClass('border-red');
                tooltip.hide()
                $(this).attr('validate', true);
            } else {
                $(this).addClass('border-red');
                tooltip.show()
                tooltip.text('Email không hợp lệ')
                // $(this).attr('title', 'Email không hợp lệ')
                $(this).attr('validate', false);
            }
        })

        /**
         * Validate số điện thoại
         * Author: HHDang (6/7/2021)
         */
        $('#nbPhoneNumber').blur(function () {
            let value = $(this).val();
            let tooltip = $(this).parent().find('.tooltiptext');
            const regx = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
            if (regx.test(value)) {
                $(this).removeClass('border-red');
                tooltip.hide()
                $(this).attr('validate', true);
            } else {
                $(this).addClass('border-red');
                tooltip.show()
                tooltip.text('Số điện thoại không hợp lệ')
                // $(this).attr('title', 'Số điện thoại không hợp lệ')
                $(this).attr('validate', false);
            }
        })

        /**
         * Thêm sự kiện nhấn phím esc đóng dialog
         * Author: HHDang (8/7/2021)
         */
        $(document).on('keydown', function (e) {
            // keyCode của phím esc là 27
            if (e.keyCode === 27 && $('.dialog').hasClass('show')) {
                togglePopUp();
            }
        })
    }

    //#endregion

    changePopUpContent({ type, title, content, btnCancel, btnSave }) {
        $('.popup-footer .btn-cancel').text(btnCancel);
        $('.popup-footer .btn-save').text(btnSave);
        $('.popup-header-title span').text(title);
        $('.popup-warning-content__text span').html(content);
        if (type == "warning") {
            $('.popup-footer .btn-save').css('background-color', "#019160");
            $('.popup-footer .btn-save').removeClass('delete-record');
        }
        if (type == "delete") {
            $('.popup-footer .btn-save').css('background-color', "#F65454");
            $('.popup-footer .btn-save').addClass('delete-record');
        }
    }

    /**
     * Truyền dữ liệu về thông tin nhân viên vào form thông tin
     * Author: HHDang (8/7/2021)
     * @param {thông tin nhân viên trả về theo id} res 
     */
    async insertDialogInfo(res) {
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
     * Load các combobox tĩnh
     * Author: HHDang (11/7/2021)
     */
    loadDataCombobox() {

    }

    filterData() {

    }

    /**
     * Thêm mới dữ liệu
     * CreatedBy: HHDang (5/7/2021)
     */
    add(employee) {
        let mine = this;
        // Post dữ liệu
        $.ajax({
            url: mine.dataUrl,
            method: "POST",
            data: JSON.stringify(employee),
            contentType: 'application/json'
        }).done(function (res) {
            // Sau khi lưu thành công
            // + Thông báo thành công
            // alert('Lưu thành công');
            toast({
                message: "Thêm nhân viên thành công!",
                type: 'success',
                duration: 2000
            })
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
            // alert('Lưu thay đổi thành công');
            toast({
                message: "Lưu thay đổi thành công!",
                type: 'success',
                duration: 2000
            })
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
            // alert("Xóa thành công!!!");
            toast({
                message: "Xóa nhân viên thành công!",
                type: 'success',
                duration: 2000
            })
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
        $('.tooltip .tooltiptext').hide();
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
        $('.btn-dbclick').hide();
    })
}

function togglePopUp() {
    $('.popup-background').toggleClass('hidden show');
    $('.popup').toggleClass('hidden show');
}