// Your code here
function createEmployeeRecord(dataArray) {
    return {
        firstName: dataArray[0],
        familyName: dataArray[1],
        title: dataArray[2],
        payPerHour: dataArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(dataArrayArray) {
    return dataArrayArray.map(createEmployeeRecord);
}

function createTimeInEvent(record, dateTimeStamp) {
    const timeInObj = {
        type: "TimeIn",
        date: getDateFromDateTimeStamp(dateTimeStamp),
        hour: getHourFromDateTimeStamp(dateTimeStamp)
    };
    record.timeInEvents.push(timeInObj);
    return record;
}

function createTimeOutEvent(record, dateTimeStamp) {
    const timeOutObj = {
        type: "TimeOut",
        hour: getHourFromDateTimeStamp(dateTimeStamp),
        date: getDateFromDateTimeStamp(dateTimeStamp)
    };
    record.timeOutEvents.push(timeOutObj);
    return record;
}

function hoursWorkedOnDate(record, dateStamp) {
    const outHour = record.timeOutEvents.find(event => event.date === dateStamp).hour;
    const inHour = record.timeInEvents.find(event => event.date === dateStamp).hour;
    return (outHour - inHour) / 100;
}

function wagesEarnedOnDate(record, dateStamp) {
    const hoursWorked = hoursWorkedOnDate(record, dateStamp);
    return hoursWorked * record.payPerHour;
}

function allWagesFor(record) {
    let totalWages = 0;
    const dates = record.timeOutEvents.map(event => event.date);
    dates.forEach(date => {
        totalWages += wagesEarnedOnDate(record, date);
    })
    return totalWages;
}

function calculatePayroll(records) {
    return records.reduce((accumulator, current) => accumulator + allWagesFor(current),0);
}
//helper functions
function getHourFromDateTimeStamp(dateTimeStamp) {
    //dateStamp format: "YYYY-MM-DD HHMM"
    return parseInt(dateTimeStamp.slice(-4));
}

function getDateFromDateTimeStamp(dateTimeStamp) {
    return dateTimeStamp.slice(0,10);
}