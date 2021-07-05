$(document).ready(function() {
  $('.btn-dropdown-department').click(() => {
    const dropdownName = 'dropdown-box-department';
    if($(`.${dropdownName}`).hasClass('hidden')) {
      showDropdown(dropdownName);
    } else {
      hideDropdown(dropdownName);
    }
  })
  $('.btn-dropdown-position').click(() => {
    const dropdownName = 'dropdown-box-position';
    if($(`.${dropdownName}`).hasClass('hidden')) {
      showDropdown(dropdownName);
    } else {
      hideDropdown(dropdownName);
    }
  })
})

function getSelectedItem(dropdownName) {
  let itemName = dropdownName.split('-')[2];
  $(`.dropdown-item input[name=radio-${itemName}]`).change(function() {
    $(`.btn-dropdown-${itemName} .select-box-text`).text($(this).val())
    console.log(this);
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