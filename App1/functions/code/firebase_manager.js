// Default lines 
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

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
    console.log("Database path: " + path);
    console.log("Database: " + reference);
    return reference;
}

module.exports.getDatabaseReference = getDatabaseReference;
module.exports.functions = functions;