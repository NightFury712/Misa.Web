$(document).ready(function() {
    // Bind event click select box

    clickSelectBox();

    // End bind event click select box
})

/**
 * Thêm sự kiện click để ẩn hiện dropdown
 * Author: HHDang (6/7/2021)
 * 
 */
function clickSelectBox() {
    $(`.btn-select-box`).click(function() {
        const dropdownName = `dropdown-box-${$(this).attr('class').split(/\s+/)[1].split('-')[2]}`

        if ($(`.${dropdownName}`).hasClass('hidden')) {
            showDropdown(dropdownName);
        } else {
            hideDropdown(dropdownName);
        }
    })
}

/**
 * Lấy giá trị người dùng chọn ở dropdown
 * Author: HHDang (6/7/2021)
 * 
 */
function getSelectedItem(dropdownName) {
    let itemName = dropdownName.split('-')[2];
    // Thêm icon check cho từng item dropdown
    let el = $(`.${dropdownName} .dropdown-item .dropdown-item__icon`);
    el.empty();
    el.append('<i class="fas fa-check"></i>')
        // Lấy giá trị item được chọn
    $(`.dropdown-item input[name=radio-${itemName}]`).change(function() {
        $(`.btn-dropdown-${itemName}~.select-box-text`).val($(this).val());
        // console.log(this);
        hideDropdown(dropdownName);
    })
}

/**
 * Ẩn dropdown
 * Author: HHDang (6/7/2021)
 * 
 */
function hideDropdown(dropdownName) {
    const name = dropdownName.split('-')[2]
    $(`.${dropdownName}`).addClass('hidden');
    $(`.${dropdownName}`).removeClass('show');
    $(`.btn-dropdown-${name} .select-box-icon i`).removeClass('fa-chevron-up')
    $(`.btn-dropdown-${name} .select-box-icon i`).addClass('fa-chevron-down')

}

/**
 * Hiện dropdown
 * Author: HHDang (6/7/2021)
 * 
 */
function showDropdown(dropdownName) {
    $('.dropdown-box').removeClass('show');
    $('.dropdown-box').addClass('hidden');
    $(`.btn-select-box .select-box-icon i`).removeClass('fa-chevron-up')
    $(`.btn-select-box .select-box-icon i`).addClass('fa-chevron-down')

    const name = dropdownName.split('-')[2];
    getSelectedItem(dropdownName)
    $(`.${dropdownName}`).removeClass('hidden');
    $(`.${dropdownName}`).addClass('show');
    $(`.btn-dropdown-${name} .select-box-icon i`).removeClass('fa-chevron-down')
    $(`.btn-dropdown-${name} .select-box-icon i`).addClass('fa-chevron-up')
}