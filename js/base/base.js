class BaseJS {
    constructor() {
        this.dataUrl = null;
        this.setDataUrl();
        this.loadData();
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
            
        }) 

        // Hiển thị thông tin chi tiết khi nhấn đúp chuột chọn 1 bản ghi trên danh sách dữ liệu
        $('table tbody').on('dblclick', 'tr', function() {
            // alert(1);
            let trSiblings = $(this).siblings();
            trSiblings.removeClass('row-selected');
            $(this).addClass('row-selected');
            // $('tr').css('background-color', 'none')
            // $(this).css('background-color', '#e5e5e5')
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