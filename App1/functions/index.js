// Import the firebase manager
const dashboard = require('./code/functions/dashboard');

// Import dashboard functions
exports.getVendorsFrequency = dashboard.getVendorsFrequency;
exports.getCategoriesFrequencyMonth = dashboard.getCategoriesFrequencyMonth;
exports.getCategoriesFrequencyThreeMonth = dashboard.getCategoriesFrequencyThreeMonth;
exports.getCategoriesFrequencyYear = dashboard.getCategoriesFrequencyYear;