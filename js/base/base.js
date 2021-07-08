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
        $('.btn-add-emp').on('click', function() {
            $('#btnSave').addClass('add-new-employee');
            $('.dialog-footer .btn-cancel').removeClass('delete-employee');
            $('.dialog-footer .btn-cancel').text('Hủy')
            $('#btnSave span').text('Lưu');
            $.each($('.emp-info-general-item'), (index, formaddItem) => {
                $(formaddItem).find('input').first().val('')
            })

            toggleDialog();
        })

        $('.btn-close-dialog .btn-close').click(function() {
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
        $('#btnRefresh').click(function() {
            mine.loadData();
        })

        // Thực hiện lưu dữ liệu khi nhấn button [Lưu] trên form chi tiết
        $('#btnSave').click(async function() {
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
            let workStatus = formatWorkstatus($('#txtWorkStatus').val(), 2)
            let genderCode = formatGender($('#rdGender').val(), 2);
            let departmentId = await formatDepartment($('#txtDepartment').val());
            let positionId = await formatPosition($('#txtPosition').val());
            // console.log(genderCode)

            // Thu thập thông tin dữ liệu nhập và buil thành obj
            const employee = {
                "employeeCode": $('#txtEmployeeCode').val(),
                "fullName": $('#txtFullName').val(),
                "dateOfBirth": $('#dtDateOfBirth').val(),
                "gender": genderCode,
                "identityNumber": $('#nbIdentityNumber').val(),
                "identityDate": $('#txtIdentityDate').val(),
                "identityPlace": $('#txtIdentityPlace').val(),
                "email": $('#txtEmail').val(),
                "phoneNumber": $('#nbPhoneNumber').val(),
                "positionId": positionId,
                "departmentId": departmentId,
                "personalTaxCode": $('#nbPersonalTaxCode').val(),
                "salary": $('#nbSalary').val(),
                "joinDate": $('#dtJoinDate').val(),
                "WorkStatus": workStatus
            }

            console.log(employee);
            if ($(this).hasClass('add-new-employee')) {
                mine.add(employee);
            } else {
                // console.log("heello");
                mine.edit(EmployeeId, employee);
            }
        })

        // Hiển thị thông tin chi tiết khi nhấn đúp chuột chọn 1 bản ghi trên danh sách dữ liệu
        $('table tbody').on('dblclick', 'tr', function() {
            // alert(1);
            $('#btnSave').removeClass('add-new-employee');
            $('.dialog-footer .btn-cancel').addClass('delete-employee')
            $('.dialog-footer .btn-cancel').text('Xóa nhân viên')
            $('#btnSave span').text('Lưu thay đổi');
            let trSiblings = $(this).siblings();
            trSiblings.removeClass('row-selected');
            $(this).addClass('row-selected');
            EmployeeId = $(this).attr('EmployeeId');
            toggleDialog();
            $.ajax({
                url: `${mine.dataUrl}/${EmployeeId}`,
                method: "GET"
            }).done(function(res) {
                mine.insertDialogInfo(res)
                    // $('#btnSave span').text('Lưu thay đổi');
            }).fail(function(err) {
                console.log(err);
            })
        })

        /**
         * Validate bắt buộc nhập
         * Author: HHDang (6/7/2021)
         */
        $('[required]').blur(function() {
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
        $('input[type=email]').blur(function() {
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
        $('#nbPhoneNumber').blur(function() {
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
    }

    //#endregion


    insertDialogInfo(res) {
        console.log('parent insertDialogInfo: ' + res)
    }

    setDataUrl() {

    }

    /**
     * Load dữ liệu
     * CreatedBy: HHDang (5/7/2021)
     */
    loadData() {
        // Lấy dữ liệu 
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
    add() {
        let mine = this;
        // Post dữ liệu
        $.ajax({
            url: "http://cukcuk.manhnv.net/v1/Employees",
            method: "POST",
            data: JSON.stringify(employee),
            contentType: 'application/json'
        }).done(function(res) {
            // Sau khi lưu thành công
            // + Thông báo thành công
            alert('Lưu thành công');
            // + Ẩn form
            toggleDialog();
            // + load lại dữ liệu
            mine.loadData();
        }).fail(function(err) {
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
        }).done(function(res) {
            // Sau khi lưu thành công
            // + Thông báo thành công
            alert('Lưu thay đổi thành công');
            // + Ẩn form
            toggleDialog();
            // + load lại dữ liệu
            mine.loadData();
            console.log(res);
        }).fail(function(err) {
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
        }).done(function(res) {
            alert("Xóa thành công!!!");
            mine.loadData();
            console.log(res);
        }).fail(function(err) {
            console.log(err);
        })

    }
}