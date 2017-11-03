// Import the firebase manager
const firebase = require('../managers/firebase_manager');
// Import the helpers
const helpers = require('../helpers/helpers');

//============================================================
//                        COMMON METHODS
//============================================================

/**
 * Method which provide the getting of the dashboard diagram
 */
function getCategories(req, res, monthInterval) {
    // Create start and end date
    let endDate = new Date();
    let startDate = new Date();
    startDate.setMonth(endDate.getMonth() - interval);
    // Create result Map
    let database = firebase.getDatabaseReference("receipts", req.query.userID);
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
            // Get date
            let date = new Date(object.child("creationDate").val() || object.child("creation_date").val());
            helpers.log(startDate + " >= " + date + " <= " + endDate + " = " + helpers.isDateInRange(date, startDate, endDate));
            if (helpers.isDateInRange(date, startDate, endDate) === true) {
                // Get previous category value
                let previousValue = categoriesMap[category] || 0;
                // Increate previous value
                categoriesMap[category] = previousValue + 1;
                // Increase category frequency
                categoriesFrequency = categoriesFrequency + 1;
            } else if (monthInterval <= 0) {
                // Get previous category value
                let previousValue = categoriesMap[category] || 0;
                // Increate previous value
                categoriesMap[category] = previousValue + 1;
                // Increase category frequency
                categoriesFrequency = categoriesFrequency + 1;
            }
        }
        resultMap = helpers.sortMapByValues(categoriesMap, total);
        // Calculate frequency
        for (let key in resultMap) {
            var object = resultMap[key];
            object.frequency = (object.value * 100) / categoriesFrequency;
        }
        res.send({
            "success": true,
            "data": resultMap
        });
    });
};

/**
 * Method which provide the getting of the dashboard diagram
 */
module.exports.getVendorsFrequency = firebase.functions.https.onRequest((req, res) => {
    // Create result Map
    let database = firebase.getDatabaseReference("receipts", req.query.userID);
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
        helpers.log(keys);
        for (let key in keys) {
            // Get object
            let object = snapshot.child(key);
            // Get Vendor name
            let vendor = object.child("vendor").val();
            // Get date
            let date = new Date(object.child("creationDate").val() || object.child("creation_date").val());
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
        resultMap = helpers.sortMapByValues(categoriesMap, total);
        for (let key in resultMap) {
            var object = resultMap[key];
            object.frequency = (frequencyMap[key] * 100) / receiptsFrequency;
        }
        res.send({
            "success": true,
            "data": resultMap
        });
    });
});

//============================================================
//                        DATE FILTER
//============================================================

/**
 * Method which provide the getting of the dashboard diagram
 */
module.exports.getCategoriesFrequencyMonth = firebase.functions.https.onRequest((req, res) => {
    getCategories(req, res, 1);
});

/**
 * Method which provide the getting of the dashboard diagram
 */
module.exports.getCategoriesFrequencyThreeMonth = firebase.functions.https.onRequest((req, res) => {
    getCategories(req, res, 3);
});

/**
 * Method which provide the getting of the dashboard diagram
 */
module.exports.getCategoriesFrequencyYear = firebase.functions.https.onRequest((req, res) => {
    getCategories(req, res, 12);
});

//============================================================
//                        USEFULL LINKS
//============================================================

// https://firebase.google.com/docs/cloud-messaging/admin/send-messages?authuser=1