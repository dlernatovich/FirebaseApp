//============================================================
//                            LOG
//============================================================

/**
 * Method which provide the log functional for the firebase
 * 
 * @param {any} message {@link String} value of the message
 */
function log(message) {
    console.log("-----> [Firebase log] " + message);
}

//============================================================
//                         SORT FUNCTION
//============================================================

/**
 * Function which provide to sort map by values
 * 
 * @param {any} map {@link Map} value for the sorting map
 * @param {any} total {@link Int} value of the total
 * @returns {@link Map} value of the sorted map 
 */
function sortMapByValues(map, total) {
    var resultMap = new Map();
    var sortingArray = [];
    for (var key in map) {
        sortingArray.push([key, map[key]]);
    }
    sortingArray.sort(function (a, b) {
        return a[1] < b[1];
    });
    for (let value in sortingArray) {
        var object = new Object();
        let item = sortingArray[value];
        object.name = item[0];
        object.value = item[1];
        // resultMap[item[0]] = item[1];
        resultMap[object.name] = object;
        if (value == (total - 1)) {
            break;
        }
    }
    return resultMap;
}

/**
 * Method which provide the show of the firebase object
 * 
 * @param {any} firebaseObject instance of the firebase object
 */
function showObject(firebaseObject) {
    for (let key in firebaseObject.val()) {
        log("Key: " + key + "and Value: " + firebaseObject.child(key).val());
    }
}

//============================================================
//                         DATES
//============================================================

/**
 * Method which provide the checking if the date in range of the start date and end date
 * 
 * @param {any} date {@link Date} value of the checking
 * @param {any} startRange {@link Date} value of the start range
 * @param {any} endRange {@link Date} value of the end range
 * @returns 
 */
function isDateInRange(date, startRange, endRange) {
    if (date <= endRange && date >= startRange) {
        return true;
    }
    return false;
}

module.exports.log = log;
module.exports.sortMapByValues = sortMapByValues;
module.exports.showObject = showObject;
module.exports.isDateInRange = isDateInRange;