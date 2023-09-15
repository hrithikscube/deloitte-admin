
const values = [
    { EMPLOYEE_ID: 996, EMPLOYEE_NAME: 'YOGANATHAN', EMPLOYEE_EMAIL: 'yoganathan@scube.me' },
    { EMPLOYEE_ID: 9926, EMPLOYEE_NAME: 'YOGANA11THAN', EMPLOYEE_EMAIL: 'yoganatha11n@scube.me' },
    { EMPLOYEE_ID: 9296, EMPLOYEE_NAME: 'YOGANATHA2N', EMPLOYEE_EMAIL: 'yoganathan@scube.me' }
];

const valueArr = values.map(function (item) { return item.EMPLOYEE_NAME });
const duplicateNames = valueArr.some(function (item, idx) {
    return valueArr.indexOf(item) != idx
});

const tempArr = values.map(function (item) { return item.EMPLOYEE_ID });
const duplicateId = tempArr.some(function (item, idx) {
    return tempArr.indexOf(item) != idx
});

const tempArr2 = values.map(function (item) { return item.EMPLOYEE_EMAIL });
const duplicateEmail = tempArr2.some(function (item, idx) {
    return tempArr.indexOf(item) != idx
});


// console.log(duplicateNames || duplicateId ? 'There are duplicates values' : 'No duplicates values');

console.log(duplicateNames,'duplicateNames')
console.log(duplicateId,'duplicateId')
console.log(duplicateEmail,'duplicateEmail')



