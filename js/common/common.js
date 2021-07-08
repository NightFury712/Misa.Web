/**
 * Format dữ liệu ngày tháng sang ngày/tháng/năm
 * Author: HHDang (6/7/2021)
 * @param {1991-07-09T00:00:00} date 
 * @returns 09/07/1991
 */
function formatDate(date, option) {
    var date = new Date(date);
    if (Number.isNaN(date.getTime())) {
        return "";
    } else {
        let day = date.getDate()
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        if (option == 1) {
            return `${day}/${month}/${year}`;
        } else {
            return `${year}-${month}-${day}`
        }
    }

}
/**
 * Format dữ liệu tiền tệ dạng xxx.xxx.xxx
 * Author: HHDang (6/7/2021)
 * @param {11611615} money 
 * @returns 11.611.615
 */
function formatMoney(money) {
    if (money !== null) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        })
        money = formatter.format(money)
            // money = money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, ".")
        return money;
    } else return 0;
}

/**
 * Format dữ liệu giới tính
 * Author: HHDang (6/7/2021)
 * @param {1 || 2 || 3} gender
 * @returns Nữ || Nam || Giới tính khác
 */
function formatGender(gender, option) {
    if (option == 1) {
        switch (gender) {
            case 0:
                return 'Nữ';
            case 1:
                return 'Nam';
            default:
                return 'Giới tính khác';
        }
    } else {
        switch (gender) {
            case 'Nữ':
                return 0;
            case 'Nam':
                return 1;
            default:
                return null;
        }
    }


}

/**
 * Format trạng thái công việc
 * Author: HHDang (6/7/2021)
 * @param {0} workstatus 
 * @returns 'Đã nghỉ việc'
 */

function formatWorkstatus(workstatus, option) {
    if (option == 1) {
        switch (workstatus) {
            case 0:
                return "Đã nghỉ việc";
            case 1:
                return "Đang làm việc";
            case 2:
                return "Thực tập sinh";
            case 3:
                return "Nghỉ thai sản";
            default:
                return "Không xác định";
        }
    } else {
        switch (workstatus) {
            case "Đã nghỉ việc":
                return 0;
            case "Đang làm việc":
                return 1;
            case "Thực tập sinh":
                return 2;
            case "Nghỉ thai sản":
                return 3;
            default:
                return null;
        }
    }
}

/**
 * Format tên phòng ban thành id phòng ban
 * Author: HHDang (8/7/2021)
 * @param {"Phòng Marketting"} departmentName 
 * @returns "PB99"
 */
async function formatDepartment(departmentName) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://cukcuk.manhnv.net/api/Department",
            method: "GET"
        }).done(function(res) {
            let index = res.findIndex(item => item.DepartmentName == departmentName);
            if (index === -1) {
                resolve(null);
            } else {
                resolve(res[index].DepartmentId);
            }
        }).fail(function(err) {
            reject(err);
        })
    })
}

/**
 * Format tên vị trí công việc thành id vị trí công việc
 * Author: HHDang(8/7/2021)
 * @param {"Phòng Đào tạo"} positionName 
 * @returns "P08"
 */
async function formatPosition(positionName) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://cukcuk.manhnv.net/v1/Positions",
            method: "GET"
        }).done(function(res) {
            let index = res.findIndex(item => item.PositionName == positionName);
            if (index === -1) {
                resolve(null);
            } else {
                resolve(res[index].PositionId);
            }
        }).fail(function(err) {
            reject(err);
        })
    })
}

/**
 * Format tình trạng quan hệ thành id
 * Author: HHDang (8/7/2021)
 * @param {Tình trạng quan hệ} martialStatusName 
 * @returns id của tình trạng quan hệ trong database
 */
function formatMartialStatus(martialStatusName) {
    switch(martialStatusName) {
        case "Độc thân":
            return 0;
        case "Đã có gia đình":
            return 1;
        case "Sống chung chưa kết hôn":
            return 2;
        case "Đã kết hôn":
            return 3;
        case "Góa":
            return 4;
        case "Ly thân":
            return 5;
        default:
            return null;
    }
}

/**
 * Format học vấn thành id
 * Author: HHDang (8/7/2021)
 * @param {Học vấn} educationalBackgroundName 
 * @returns id của học vấnt rong database
 */
function formatEducationalBackground(educationalBackgroundName) {
    switch(educationalBackgroundName) {
        case "Tiểu học":
            return 0;
        case "Trung học cơ sở":
            return 1;
        case "Trung học phổ thông":
            return 2;
        case "Trung cấp":
            return 3;
        case "Cao đẳng":
            return 4;
        case "đại học":
            return 5;
        default:
            return null;
    }
}