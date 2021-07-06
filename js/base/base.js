class BaseJS {
    constructor() {
        this.dataUrl = null;
        this.setDataUrl();
        this.loadData();
        this.loadDataDepartment();
        this.initEvents();
    }

    initEvents() {
        let mine = this;
        // Thực hiện load dữ liệu khi nhấn button nạp
        $('#btnRefresh').click(function() {
            mine.loadData();
        })

        // Thực hiện lưu dữ liệu khi nhấn button [Lưu] trên form chi tiết
        $('#btnSave').click(function() {
            // Validate dữ liệu:
            var inputValidates = $('input[required], input[type=email], #nbPhoneNumber');
            $.each(inputValidates, (index, input) => {
                $(input).trigger('blur');
            })
            let inputNotValids = $('input[validate=false]');
            if(inputNotValids && inputNotValids.length > 0) {
                alert("Dữ liệu không hợp lệ vui lòng kiểm tra lại.")
                inputNotValids[0].focus();
                console.log(inputNotValids[0]);
                return;
            }

            // Thu thập thông tin dữ liệu nhập và buil thành obj
            const employee = {
                "EmployeeCode": $('#txtEmployeeCode').val(),
                "FullName": $('#txtFullName').val(),
                "DateOfBirth": $('#dtDateOfBirth').val(),
                "Email": $('#txtEmail').val(),
                "IdentityNumber": $('#nbIdentityNumber').val(),
                "IdentityDate": $('#txtIdentityDate').val(),
                "IdentityPlace": $('#txtIdentityPlace').val(),
                "WorkStatus": $('#txtWorkStatus').val(),
                "PersonalTaxCode": $('#nbTaxCode').val(),
                "Salary": $('#nbSalary').val(),
                "GenderName": $('#rdGender').val(),
            }
            console.log(employee);
            // Sau khi lưu thành công
            // + Thông báo thành công
            // + Ẩn form
            // + load lại dữ liệu
            // toggleDialog();
        })

        // Hiển thị thông tin chi tiết khi nhấn đúp chuột chọn 1 bản ghi trên danh sách dữ liệu
        $('table tbody').on('dblclick', 'tr', function() {
            // alert(1);
            let trSiblings = $(this).siblings();
            trSiblings.removeClass('row-selected');
            $(this).addClass('row-selected');
            toggleDialog();
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
            if(re.test(String(value).toLowerCase())) {
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
            if(regx.test(value)) {
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
     * CreatedBy: HHDang (6/7/2021)
     */
    loadDataDepartment() {

    }

    /**
     * Thêm mới dữ liệu
     * CreatedBy: HHDang (5/7/2021)
     */
    add() {
        $.ajax({
            url: this.dataUrl,
            method: "POST",
            data: JSON.stringify(employee),
            contentType: 'application/json'
        }).done(function(res) {
            alert('Lưu thành công');
            toggleDialog();
            console.log(res);
        }).fail(function(err) {
            console.log(err);
        })
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