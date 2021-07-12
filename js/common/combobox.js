$(document).ready(function () {
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
    $(`.btn-select-box`).click(function () {
        const comboboxName = `.combobox-box-${$(this).attr('class').split(/\s+/)[1].split('-')[2]}`

        if ($(comboboxName).hasClass('hidden')) {
            showCombobox(comboboxName);
        } else {
            hideCombobox(comboboxName);
        }
    })
}

/**
 * Ẩn combobox
 * Author: HHDang (6/7/2021)
 * 
 */
function hideCombobox(comboboxName) {
    const name = comboboxName.split('-')[2]
    $(comboboxName).addClass('hidden');
    $(comboboxName).removeClass('show');
    $(`.btn-combobox-${name} .select-box-icon i`).removeClass('fa-chevron-up')
    $(`.btn-combobox-${name} .select-box-icon i`).addClass('fa-chevron-down')


}

/**
 * Hiện combobox
 * Author: HHDang (6/7/2021)
 * 
 */
function showCombobox(comboboxName) {
    $('.combobox-box').removeClass('show');
    $('.combobox-box').addClass('hidden');
    $(`.btn-select-box .select-box-icon i`).removeClass('fa-chevron-up')
    $(`.btn-select-box .select-box-icon i`).addClass('fa-chevron-down')
    // $(`input[type=radio]`).prop('checked', false);

    const name = comboboxName.split('-')[2];
    getSelectedItem(comboboxName)
    $(comboboxName).removeClass('hidden');
    $(comboboxName).addClass('show');
    $(`.btn-combobox-${name} .select-box-icon i`).removeClass('fa-chevron-down')
    $(`.btn-combobox-${name} .select-box-icon i`).addClass('fa-chevron-up')
}


/**
 * Lấy giá trị người dùng chọn ở combobox
 * Author: HHDang (6/7/2021)
 * 
 */
function getSelectedItem(comboboxName) {
    let itemName = comboboxName.split('-')[2];
    $(`.combobox-item input[name=radio-${itemName}]`).change(function () {
        $(`.btn-combobox-${itemName}~.select-box-text`).val($(this).val());
        $(`.btn-combobox-${itemName}~.select-box-text`).data("id", $(this).data("id"))
        // console.log(this);
        hideCombobox(comboboxName);
    })
}

// Hàm khởi tạo 1 combobox
function combobox({inputName, cbxName, dataArr }) {
    const input = $(inputName);
    const comboboxName = `.combobox-box-${cbxName}`
    const comboboxDiv = $(comboboxName);
    
    let index = 0;
    let selectedItem;
    let filterArray = [];  
    // console.log(dataArr[0])
    if(dataArr[0].id === '') {
        $(`.select-box-${cbxName} .select-box-text`).val(dataArr[0].name);
        $(`.select-box-${cbxName} .select-box-text`).data('id', dataArr[0].id)
    }

    // Nếu người dùng gõ phím bất kì sẽ thực thi hàm
    input.on('keyup', function (e) {
        let userData = $(this).val().toLowerCase();
        if (userData) {
            filterArray = dataArr.filter((item) => {
                // filtering array value and user characters to lowercase and return only those words which are start with user enetered chars 
                return item.name.toLocaleLowerCase().includes(userData);
            })
            comboboxDiv.empty();
            if (!filterArray.length) {
                // Nếu không có item nào phù hợp với giá trị người dùng nhập thì hiển thị chính giá trị đó
                const cbxItem = `<div class="combobox-item">
                    <div class="combobox-item__icon"><i class="fas fa-check"></i></div>
                    <input type="radio" id="radio-${cbxName}-1" name="radio-${cbxName}" value="${userData}"></input>
                    <label for="radio-${cbxName}-1">${userData}</label>
                </div>`
                comboboxDiv.append(cbxItem);
                $(`#radio-${cbxName}-1`).data("id", '');
            } else {
                // append các item vào combobox-container
                $.each(filterArray, (index, item) => {
                    const cbxItem = `<div class="combobox-item">
                        <div class="combobox-item__icon"><i class="fas fa-check"></i></div>
                        <input type="radio" id="radio-${cbxName}-${index + 1}" name="radio-${cbxName}" value="${item.name}"></input>
                        <label for="radio-${cbxName}-${index + 1}">${item.name}</label>
                    </div>`
                    comboboxDiv.append(cbxItem);
                    $(`#radio-${cbxName}-${index + 1}`).data("id", item.id);
                    // console.log(item.id)
                })
            }

            // Hiển thị combobox
            showCombobox(comboboxName);
            // Thêm margin top và button cho item đầu và cuối
            $(`.combobox-box-${cbxName} .combobox-item`).first().addClass('combobox-item-first')
            $(`.combobox-box-${cbxName} .combobox-item`).last().addClass('combobox-item-last')

        } else {
            // Ẩn combobox nểu không có dữ liệu được nhập vào
            hideCombobox(comboboxName);
        }
        if (e.keyCode === 40) {
            index++;
            if(index === filterArray.length + 1) index--;
            $(`#radio-${cbxName}-${index}`).prop('checked', true);
            selectedItem = $(`input[name=radio-${cbxName}]:checked`)
        }
        if (e.keyCode === 38) {
            index--;
            if(index === 0) index++;
            $(`#radio-${cbxName}-${index}`).prop('checked', true);
            selectedItem = $(`input[name=radio-${cbxName}]:checked`);
        }
        if (e.keyCode === 13) {
            index = 0;
            $(`.btn-combobox-${cbxName}~.select-box-text`).val(selectedItem.val());
            // Lấy ra id của item gán cho thẻ input cha
            $(`.btn-combobox-${cbxName}~.select-box-text`).data("id", $(`#${$(selectedItem).attr('id')}`).data('id'))
            // console.log($('.select-box-department .select-box-text'));
            hideCombobox(comboboxName);
        }
        
        // console.log($('#rdGender').data('id'));
        input.blur(function() {
            hideCombobox(comboboxName);
        })
    })
}

