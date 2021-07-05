$(document).ready(function() {

})


/**
 * Class quản lý các api cho trang Customer
 * CreatedBy: HHDang (5/7/2021)
 */
class CustomerJS extends BaseJS {
    constructor() {
        this.name = "dang";
        this.loadData();
    }

    /**
     * Load dữ liệu
     * CreatedBy: HHDang (5/7/2021)
     */
    loadData() {
        // Lấy dữ liệu 
        $.ajax({
            url: "http://cukcuk.manhnv.net/v1/Employees",
            method: "GET"
        }).done(function(res) {
            var data = res;
            console.log(data);
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