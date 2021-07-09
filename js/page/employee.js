$(document).ready(function () {
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
     * Truyền dữ liệu về thông tin nhân viên vào form thông tin
     * Author: HHDang (8/7/2021)
     * @param {Thông tin nhân viên trả về theo id} res 
     */
    insertDialogInfo(res) {
        // Hiển thị thông tin ngày sinh
        let dob = formatDate(res.DateOfBirth, 2);
        let identityDate = formatDate(res.IdentityDate, 2);
        let joinDate = formatDate(res.JoinDate, 2);
        let workStatus = formatWorkstatus(res.WorkStatus, 1);

        $('#txtEmployeeCode').val(res.EmployeeCode);
        $('#txtFullName').val(res.FullName);
        $('#dtDateOfBirth').val(dob);
        $('#rdGender').val(res.GenderName);
        $('#nbIdentityNumber').val(res.IdentityNumber);
        $('#txtIdentityDate').val(identityDate);
        $('#txtIdentityPlace').val(res.IdentityPlace);
        $('#txtEmail').val(res.Email);
        $('#nbPhoneNumber').val(res.PhoneNumber);
        $('#txtPosition').val(res.PositionName);
        $('#txtDepartment').val(res.DepartmentName);
        $('#nbPersonalTaxCode').val(res.PersonalTaxCode);
        $('#nbSalary').val(parseInt(res.Salary));
        $('#txtWorkStatus').val(workStatus);
        $('#dtJoinDate').val(joinDate);
    }

    /**
     * Load dữ liệu
     * Author: HHDang (5/7/2021)
     */


    /**
     * Load dữ liệu phòng ban
     * Author: HHDang (5/7/2021)
     */
    loadDataDepartment() {
        $('.formadd-select-box-department .combobox-box').empty();

        // Lấy dữ liệu
        try {
            $.ajax({
                url: "http://cukcuk.manhnv.net/api/Department",
                method: "GET"
            }).done(function (res) {
                $.each(res, (index, department) => {
                    const item = `<div class="combobox-item ${index == (res.length - 1) ? 'combobox-item-last' : ''}">
                        <div class="combobox-item__icon"></div>
                        <input type="radio" id="radio-department-${index + 1}" name="radio-department" value="${department.DepartmentName}"></input>
                        <label for="radio-department-${index + 1}">${department.DepartmentName}</label>
                    </div>`

                    $('.select-box-department .combobox-box').append(item);
                    $(`#radio-department-${index + 1}`).data("Id", department.DepartmentId);

                    let itemAdd = `<div class="combobox-item "><div class="combobox-item__icon"></div>
                    <input type="radio" id="radio-adddepartment-${index + 1}" name="radio-adddepartment" value="${department.DepartmentName}"></input>
                    <label for="radio-adddepartment-${index + 1}">${department.DepartmentName}</label></div>`

                    $('.formadd-select-box-department .combobox-box').append(itemAdd);
                    $(`#radio-adddepartment-${index + 1}`).data("Id", department.DepartmentId);
                })
                $('.combobox-box-adddepartment .combobox-item').first().addClass('combobox-item-first')
                $('.combobox-box-adddepartment .combobox-item').last().addClass('combobox-item-last')
            })
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Load dữ liệu vị trí công việc
     * Author: HHDang (8/7/2021)
     */
    loadDataPosition() {
        $('.formadd-select-box-position .combobox-box').empty();

        // Lấy dữ liệu
        $.ajax({
            url: "http://cukcuk.manhnv.net/v1/Positions",
            method: "GET"
        }).done(function (res) {
            $.each(res, (index, position) => {
                const item = `<div class="combobox-item ${index == (res.length - 1) ? 'combobox-item-last' : ''}">
                    <div class="combobox-item__icon"></div>
                    <input type="radio" id="radio-position-${index + 1}" name="radio-position" value="${position.PositionName}"></input>
                    <label for="radio-position-${index + 1}">${position.PositionName}</label>
                </div>`

                $('.select-box-position .combobox-box').append(item);
                $(`radio-position-${index + 1}`).data("Id", position.PositionId)
                
                let itemAdd = `<div class="combobox-item combobox-item-first"><div class="combobox-item__icon"></div>
                <input type="radio" id="radio-addposition-${index + 1}" name="radio-addposition" value="${position.PositionName}"></input>
                <label for="radio-addposition-${index + 1}">${position.PositionName}</label></div>`
                
                $('.formadd-select-box-position .combobox-box').append(itemAdd);
                $(`#radio-addposition-${index + 1}`).data("Id", position.PositionId)
            })
            $('.combobox-box-addposition .combobox-item').first().addClass('combobox-item-first')
            $('.combobox-box-addposition .combobox-item').last().addClass('combobox-item-last')
        }).fail(function (err) {
            console.log(err)
        })
    }

    /**
     * Tạo đối tượng chứa thông tin nhân viên lấy từ form
     * Author: HHDang (8/7/2021)
     * @returns obj chứa thông tin nhân viên 
     */
    getPersonInfo() {
        // Thu thập thông tin dữ liệu nhập và buil thành obj
        let workStatus = formatWorkstatus($('#txtWorkStatus').val(), 2)
        let genderCode = formatGender($('#rdGender').val(), 2);
        let departmentId = $('#txtDepartment').data("Id");
        let positionId = $('#txtPosition').data("Id");

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
        // console.log(employee)
        return employee;
    }

    /**
     * Thêm mới dữ liệu
     * Author: HHDang (5/7/2021)
     */
    // add() {
    //     // Post dữ liệu
    //     $.ajax({
    //         url: "http://cukcuk.manhnv.net/v1/Employees",
    //         method: "POST",
    //         data: JSON.stringify(employee),
    //         contentType: 'application/json'
    //     }).done(function (res) {
    //         // Sau khi lưu thành công
    //         // + Thông báo thành công
    //         // + Ẩn form
    //         // + load lại dữ liệu
    //         alert('Lưu thành công');
    //         toggleDialog();
    //         console.log(res);
    //     }).fail(function (err) {
    //         console.log(err);
    //     })
    // }

    /**
     * Cập nhật dữ liệu
     * Author: HHDang (5/7/2021)
     */
    // edit() {

    // }

    /**
     * Xóa dữ liệu
     * Author: HHDang (5/7/2021)
     */
    // delete() {

    // }
}

