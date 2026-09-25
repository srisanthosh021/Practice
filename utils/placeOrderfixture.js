const base = require('@playwright/test');

exports.customtest = base.test.extend({
    testData: {
        "productName": "iphone 13 pro"
    }
});
// creating custom fixtures
