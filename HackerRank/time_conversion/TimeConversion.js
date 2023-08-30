'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'timeConversion' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 * PM 
 * 1 pm= 13
 * 2 = 14
 * ...
 * 11 = 23
 * 12 pm= 24
 */

function timeConversion(s) {
    // Write your code here
    
    const removeAmPm = (timeString) => timeString.slice(0, 8);
    
    const convertHour = (timeString) => {
        const amPm = s[s.length - 2];
        const hour = Number(s.slice(0, 2));
        
        const is12Am = () => amPm === 'A' && hour === 12;
        const isPmBefore12 = () => amPm === 'P' && hour !== 12;
        const updateHour = (timeString, convertedHour) => {
            const timeAsArray = timeString.split("")
            timeAsArray.splice(0, 2, convertedHour);
            return timeAsArray.join("");
        }
        
        if (isPmBefore12()) {
            const convertedHour = (hour + 12).toString();
            return updateHour(timeString, convertedHour);
        } else if (is12Am()) {
            return timeString.replace("12", "00");
        } else {
            return timeString;
        }
    }
    
    return removeAmPm(convertHour(s));
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = timeConversion(s);

    ws.write(result + '\n');

    ws.end();
}