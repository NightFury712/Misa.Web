$(document).ready(function() {
    new CustomerJS();
})


/**
 * Class quản lý các api cho trang Customer
 * Author: HHDang (5/7/2021)
 */
class CustomerJS extends BaseJS {
    constructor() {
        super();
    }

    setDataUrl() {
        this.dataUrl = "http://cukcuk.manhnv.net/v1/Employees";
    }

    /**
     * Truyền dữ liệu về thông tin khách hàng vào form thông tin
     * Author: HHDang (8/7/2021)
     * @param {Thông tin khách hàng trả về theo id} res 
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
        $('#txtAddress').val(res.Address);
        $('#txtEmail').val(res.Email);
        $('#nbPhoneNumber').val(res.PhoneNumber);
        $('#txtEducationalBackgroundName').val(res.EducationalBackgroundName);
        $('#txtMartialStatusName').val(res.MartialStatusName);
        $('#nbPersonalTaxCode').val(res.PersonalTaxCode);
        $('#nbSalary').val(parseInt(res.Salary));
        $('#dtJoinDate').val(joinDate);
        $('#txtWorkStatus').val(workStatus);
    }

    /**
     * Tạo đối tượng chứa thông tin khách hàng lấy từ form
     * Author: HHDang (8/7/2021)
     * @returns obj chứa thông tin khách hàng
     */
     async getPersonInfo() {
        // Thu thập thông tin dữ liệu nhập và buil thành obj
        let workStatus = formatWorkstatus($('#txtWorkStatus').val(), 2)
        let genderCode = formatGender($('#rdGender').val(), 2);
        let martialStatus = formatMartialStatus($('#txtMartialStatusName').val());
        let educationalBackground = formatEducationalBackground($('#txtEducationalBackgroundName').val());
        
        const customer = {
            "employeeCode": $('#txtEmployeeCode').val(),
            "fullName": $('#txtFullName').val(),
            "dateOfBirth": $('#dtDateOfBirth').val(),
            "gender": genderCode,
            "identityNumber": $('#nbIdentityNumber').val(),
            "identityDate": $('#txtIdentityDate').val(),
            "identityPlace": $('#txtIdentityPlace').val(),
            "address": $('#txtAddress').val(),
            "email": $('#txtEmail').val(),
            "phoneNumber": $('#nbPhoneNumber').val(),
            "martialStatus": martialStatus,
            "educationalBackground": educationalBackground,
            "personalTaxCode": $('#nbPersonalTaxCode').val(),
            "salary": $('#nbSalary').val(),
            "joinDate": $('#dtJoinDate').val(),
            "WorkStatus": workStatus
        }
        return customer;
    }

    /**
     * Load dữ liệu
     * Author: HHDang (5/7/2021)
     */
    // loadData() {
    //     // Lấy dữ liệu 
    //     $.ajax({
    //         url: "http://cukcuk.manhnv.net/v1/Employees",
    //         method: "GET"
    //     }).done(function(res) {
    //         var data = res;
    //         console.log(data);
    //     }).fail(function(err) {
    //         console.log(err);
    //     })
    // }

    /**
     * Thêm mới dữ liệu
     * Author: HHDang (5/7/2021)
     */
    // add() {

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