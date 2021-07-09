$(document).ready(function() {
    // Bind event click select box

    clickSelectBox();

    // End bind event click select box
})

/**
 * Thêm sự kiện click để ẩn hiện combobox
 * Author: HHDang (6/7/2021)
 * 
 */
function clickSelectBox() {
    $(`.btn-select-box`).click(function() {
        const comboboxName = `combobox-box-${$(this).attr('class').split(/\s+/)[1].split('-')[2]}`

        if ($(`.${comboboxName}`).hasClass('hidden')) {
            showcombobox(comboboxName);
        } else {
            hidecombobox(comboboxName);
        }
    })
}

/**
 * Lấy giá trị người dùng chọn ở combobox
 * Author: HHDang (6/7/2021)
 * 
 */
function getSelectedItem(comboboxName) {
    let itemName = comboboxName.split('-')[2];
    // Thêm icon check cho từng item combobox
    let el = $(`.${comboboxName} .combobox-item .combobox-item__icon`);
    el.empty();
    el.append('<i class="fas fa-check"></i>')
        // Lấy giá trị item được chọn
    $(`.combobox-item input[name=radio-${itemName}]`).change(function() {
        $(`.btn-combobox-${itemName}~.select-box-text`).val($(this).val());
        $(`.btn-combobox-${itemName}~.select-box-text`).data("Id", $(this).data("Id"))
        // console.log(this);
        hidecombobox(comboboxName);
    })
}

/**
 * Ẩn combobox
 * Author: HHDang (6/7/2021)
 * 
 */
function hidecombobox(comboboxName) {
    const name = comboboxName.split('-')[2]
    $(`.${comboboxName}`).addClass('hidden');
    $(`.${comboboxName}`).removeClass('show');
    $(`.btn-combobox-${name} .select-box-icon i`).removeClass('fa-chevron-up')
    $(`.btn-combobox-${name} .select-box-icon i`).addClass('fa-chevron-down')


}

/**
 * Hiện combobox
 * Author: HHDang (6/7/2021)
 * 
 */
function showcombobox(comboboxName) {
    $('.combobox-box').removeClass('show');
    $('.combobox-box').addClass('hidden');
    $(`.btn-select-box .select-box-icon i`).removeClass('fa-chevron-up')
    $(`.btn-select-box .select-box-icon i`).addClass('fa-chevron-down')
    $(`input[type=radio]`).prop('checked', false);

    const name = comboboxName.split('-')[2];
    getSelectedItem(comboboxName)
    $(`.${comboboxName}`).removeClass('hidden');
    $(`.${comboboxName}`).addClass('show');
    $(`.btn-combobox-${name} .select-box-icon i`).removeClass('fa-chevron-down')
    $(`.btn-combobox-${name} .select-box-icon i`).addClass('fa-chevron-up')
}