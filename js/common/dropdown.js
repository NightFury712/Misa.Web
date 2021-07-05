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
  let el = $(`.dropdown-box-${itemName} .dropdown-item .dropdown-item__icon`);
  el.empty();
  el.append('<i class="fas fa-check"></i>')

  $(`.dropdown-item input[name=radio-${itemName}]`).change(function () {
    $(`.btn-dropdown-${itemName} .select-box-text`).text($(this).val());
    // console.log(this);
    hideDropdown(dropdownName);
  })
}

function hideDropdown(dropdownName) {
  $(`.${dropdownName}`).addClass('hidden');
  $(`.${dropdownName}`).removeClass('show');
}

function showDropdown(dropdownName) {
  getSelectedItem(dropdownName)
  $(`.${dropdownName}`).removeClass('hidden');
  $(`.${dropdownName}`).addClass('show');
}