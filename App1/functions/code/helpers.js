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

module.exports.log = log;
module.exports.sortMapByValues = sortMapByValues;