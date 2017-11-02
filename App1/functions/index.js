// Default lines 
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//============================================================
//                         DASHBOARD
//============================================================

/**
 * Method which provide the getting of the dashboard diagram
 */
exports.getCategoriesFrequency = functions.https.onRequest((req, res) => {
    // Create result Map
    let database = getDatabaseReference("receipts", req.query.userID);
    let total = req.query.total || 65535;
    // Frequency variables
    var categoriesFrequency = 0;
    // Total variables
    var categoriesMap = new Map();
    var resultMap = new Map();
    // Get data
    database.on("value", function (snapshot) {
        // Get keys
        let keys = snapshot.val();
        for (let key in keys) {
            // Get object
            let object = snapshot.child(key);
            // Get category value
            let category = object.child("category").val();
            // Get previous category value
            let previousValue = categoriesMap[category] || 0;
            // Increate previous value
            categoriesMap[category] = previousValue + 1;
            // Increase category frequency
            categoriesFrequency = categoriesFrequency + 1;
        }
        resultMap = sortMapByValues(categoriesMap, total);
        // Calculate frequency
        for (let key in resultMap) {
            var object = resultMap[key];
            object.frequency = (object.value * 100) / categoriesFrequency;
        }
        res.send(resultMap);
    });
    //http://localhost:5000/firetest-cc367/us-central1/dashboard?ttt=2222&__=5656
    // res.send({msg: "Hello Dashboard", data: req.query.ttt, method: req.method, dataPost: req.body || {}});
});

/**
 * Method which provide the getting of the dashboard diagram
 */
exports.getVendorsFrequency = functions.https.onRequest((req, res) => {
    // Create result Map
    let database = getDatabaseReference("receipts", req.query.userID);
    let total = req.query.total || 200;
    // Variables for frequency
    var receiptsFrequency = 0;
    var frequencyMap = new Map();
    // Variables for total
    var categoriesMap = new Map();
    var resultMap = new Map();
    // Get information
    database.on("value", function (snapshot) {
        // Get keys
        let keys = snapshot.val();
        log(keys);
        for (let key in keys) {
            // Get object
            let object = snapshot.child(key);
            // Get Vendor name
            let vendor = object.child("vendor").val();
            // Get receipt amount
            let receiptAmount = object.child("amount").val() || 0;
            // Get previous amount
            let previousAmount = categoriesMap[vendor] || 0;
            // Get previous frequency
            let previousFrequency = frequencyMap[vendor] || 0;

            // Calculate new amount for vendor
            categoriesMap[vendor] = previousAmount + receiptAmount;
            // Calculate new frequency
            frequencyMap[vendor] = previousFrequency + 1;
            // Increate receipts amount
            receiptsFrequency = receiptsFrequency + 1;
        }
        resultMap = sortMapByValues(categoriesMap, total);
        for (let key in resultMap) {
            var object = resultMap[key];
            object.frequency = (frequencyMap[key] * 100) / receiptsFrequency;
        }
        res.send(resultMap);
    });
    //http://localhost:5000/firetest-cc367/us-central1/dashboard?ttt=2222&__=5656
    // res.send({msg: "Hello Dashboard", data: req.query.ttt, method: req.method, dataPost: req.body || {}});
});

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

//============================================================
//                          DATABASE
//============================================================

/**
 * Method which provide the getting of the database reference
 * 
 * @param {any} name {@link String} value of the section name
 * @param {any} userID {@link String} value of the user ID
 * @returns instance of the reference
 */
function getDatabaseReference(name, userID) {
    let path = name + ((userID == null) ? "" : ("/" + userID));
    var reference = admin.database().ref(path);
    log("Database path: " + path);
    log("Database: " + reference);
    return reference;
}

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