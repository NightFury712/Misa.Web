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
    async insertDialogInfo(res) {
        // Hiển thị thông tin ngày sinh
        let dob = formatDate(res.DateOfBirth, 2);
        let identityDate = formatDate(res.IdentityDate, 2);
        let joinDate = formatDate(res.JoinDate, 2);
        let workStatus = formatWorkstatus(res.WorkStatus, 1);
        // let DepartmentName
        // let PositionName
        let PositionName = await formatPosition(res.PositionId);
        let DepartmentName = await formatDepartment(res.DepartmentId);


        $('#rdGender').data('id', res.Gender)
        $('#txtWorkStatus').data('id', res.WorkStatus)
        $('#txtDepartment').data('id', res.DepartmentId)
        $('#txtPosition').data('id', res.PositionId)

        $('#txtEmployeeCode').val(res.EmployeeCode);
        $('#txtFullName').val(res.FullName);
        $('#dtDateOfBirth').val(dob);
        $('#rdGender').val(res.GenderName);
        $('#nbIdentityNumber').val(res.IdentityNumber);
        $('#txtIdentityDate').val(identityDate);
        $('#txtIdentityPlace').val(res.IdentityPlace);
        $('#txtEmail').val(res.Email);
        $('#nbPhoneNumber').val(res.PhoneNumber);
        $('#txtPosition').val(PositionName);
        $('#txtDepartment').val(DepartmentName);
        $('#nbPersonalTaxCode').val(res.PersonalTaxCode);
        $('#nbSalary').val(parseInt(res.Salary));
        $('#txtWorkStatus').val(workStatus);
        $('#dtJoinDate').val(joinDate);
    }

    /**
     * Load dữ liệu phòng ban
     * Author: HHDang (5/7/2021)
     */
    loadDataDepartment() {

        // Lấy dữ liệu
        try {
            $.ajax({
                url: "http://cukcuk.manhnv.net/api/Department",
                method: "GET"
            }).done(function (res) {
                let suggestions = [{ id: '', name: 'Tất cả phòng ban' }];
                $.each(res, (index, department) => {
                    suggestions.push({ id: department.DepartmentId, name: department.DepartmentName })
                })
                combobox({ inputName: '.select-box-department .select-box-text', cbxName: 'department', dataArr: suggestions });
                suggestions = suggestions.filter(item => item.id != '');
                combobox({ inputName: '.formadd-select-box-department .select-box-text', cbxName: 'adddepartment', dataArr: suggestions })
            }).fail(function (err) {
                console.log(err)
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
        // console.log($('.select-box-department .select-box-text'));
        // Lấy dữ liệu
        $.ajax({
            url: "http://cukcuk.manhnv.net/v1/Positions",
            method: "GET"
        }).done(function (res) {
            let suggestions = [{ id: '', name: 'Tất cả vị trí' }];
            $.each(res, (index, position) => {
                suggestions.push({ id: position.PositionId, name: position.PositionName });
            })
            combobox({ inputName: '.select-box-position .select-box-text', cbxName: 'position', dataArr: suggestions })
            suggestions = suggestions.filter(item => item.id != '');
            combobox({ inputName: '.formadd-select-box-position .select-box-text', cbxName: 'addposition', dataArr: suggestions })
        }).fail(function (err) {
            console.log(err)
        })
    }

    /**
     * Load các combobox tĩnh
     * Author: HHDang (11/7/2021)
     */
    loadDataCombobox() {
        let genderArr = [
            { id: 0, name: 'Nữ' },
            { id: 1, name: 'Nam' },
            { id: null, name: 'Giới tính khác' }
        ]
        let workStatusArr = [
            { id: 0, name: 'Đã nghỉ việc' },
            { id: 1, name: 'Đang làm việc' },
            { id: 2, name: 'Thực tập sinh' },
            { id: 3, name: 'Nghỉ thai sản' },
        ]
        combobox({ inputName: '.formadd-select-box-gender .select-box-text', cbxName: 'gender', dataArr: genderArr })
        combobox({ inputName: '.formadd-select-box-workstatus .select-box-text', cbxName: 'workstatus', dataArr: workStatusArr })
    }

    filterData() {
        $('table tbody').empty();
        let ths = $('table thead th');
        let departmentId = $('.select-box-department .select-box-text').data('id') === undefined ? '' : $('.select-box-department .select-box-text').data('id');
        let positionId = $('.select-box-position .select-box-text').data('id') === undefined ? '' : $('.select-box-position .select-box-text').data('id');
        const pageNum = parseInt($.urlParam('page'));
        // console.log($('.select-box-department .select-box-text').data('id'))
        $.ajax({
            url: `http://cukcuk.manhnv.net/v1/Employees/employeeFilter?pageSize=20&pageNumber=${pageNum}&employeeFilter=NV&departmentId=${departmentId}&positionId=${positionId}`,
            method: "GET"
        }).done(function (res) {


            // Lấy dữ liệu đã lọc thêm vào bảng
            res = res.Data;
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
        let workStatus = $('#txtWorkStatus').getId();
        // console.log($('#txtWorkStatus').getId());
        let genderCode = $('#rdGender').getId();
        // console.log($('#rdGender').getId());
        let departmentId = $('#txtDepartment').getId();
        let positionId = $('#txtPosition').getId();

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

    loadPagination() {
        const pageNum = parseInt($.urlParam('page'));
        $.ajax({
            url: `http://cukcuk.manhnv.net/v1/Employees/employeeFilter?pageSize=20&pageNumber=${pageNum}&employeeFilter=NV`,
            method: "GET"
        }).done(function (res) {
            // Đánh số trang cho trang employee
            let totalPage = res.TotalPage;
            let start = 0;
            let end = 4;
            if (pageNum >= 2) {
                start = pageNum - 2;
                if (pageNum + 2 < totalPage) {
                    end = pageNum + 2;
                } else {
                    start = totalPage - 5;
                    end = totalPage - 1;
                }
            }
            if (totalPage < 5) {
                end = totalPage;
            }
            for (let i = start; i <= end; i++) {
                let pageItem = `<a class="page-number-item ${pageNum == i ? 'actived' : ''}" href="employee.html?page=${i}">${i}</a>`
                $('.pagination .page-number').append(pageItem);
            }

            $('.first-page').attr('href', `employee.html?page=0`);
            $('.pre-page').attr('href', `employee.html?page=${pageNum > 0 ? pageNum - 1 : 0}`);
            $('.next-page').attr('href', `employee.html?page=${pageNum < totalPage - 1 ? pageNum + 1 : totalPage - 1}`);
            $('.last-page').attr('href', `employee.html?page=${totalPage - 1}`);
        })

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

