$(document).ready(function () {
  // Bind event click select box
  clickSelectBox('btn-dropdown-department');
  clickSelectBox('btn-dropdown-position');
  clickSelectBox('btn-dropdown-restaurant');
  clickSelectBox('btn-dropdown-gender');
  clickSelectBox('btn-dropdown-addposition')
  clickSelectBox('btn-dropdown-adddepartment');
  clickSelectBox('btn-dropdown-jobstate');
  // End bind event click select box
})

// Ẩn và hiện dropdown
function clickSelectBox(selectBoxName) {
  $(`.${selectBoxName}`).click(() => {
    const name = selectBoxName.split('-')[2]
    const dropdownName = `dropdown-box-${name}`;
    if ($(`.${dropdownName}`).hasClass('hidden')) {
      showDropdown(dropdownName);
    } else {
      hideDropdown(dropdownName);
    }
  })
}

function getSelectedItem(dropdownName) {
  let itemName = dropdownName.split('-')[2];
  // Thêm icon check cho từng item dropdown
  let el = $(`.${dropdownName} .dropdown-item .dropdown-item__icon`);
  el.empty();
  el.append('<i class="fas fa-check"></i>')
  // Lấy giá trị item được chọn
  $(`.dropdown-item input[name=radio-${itemName}]`).change(function () {
    $(`.btn-dropdown-${itemName} .select-box-text`).text($(this).val());
    // console.log(this);
    hideDropdown(dropdownName);
  })
}

// Ẩn dropdown
function hideDropdown(dropdownName) {
  const name = dropdownName.split('-')[2]
  $(`.${dropdownName}`).addClass('hidden');
  $(`.${dropdownName}`).removeClass('show');
  $(`.btn-dropdown-${name} .select-box-icon i`).removeClass('fa-chevron-up')
  $(`.btn-dropdown-${name} .select-box-icon i`).addClass('fa-chevron-down')
  
}

// Hiện dropdown
function showDropdown(dropdownName) {
  const name = dropdownName.split('-')[2];
  getSelectedItem(dropdownName)
  $(`.${dropdownName}`).removeClass('hidden');
  $(`.${dropdownName}`).addClass('show');
  $(`.btn-dropdown-${name} .select-box-icon i`).removeClass('fa-chevron-down')
  $(`.btn-dropdown-${name} .select-box-icon i`).addClass('fa-chevron-up')
}