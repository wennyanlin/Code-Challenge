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
    let i = 0;
    //if it's 'A' && first two number is smaller or equal to 12, return the same without the 'AM'
    //if its 'P' && first two number is smaller equal to 12, 
    
    if (s[s.length - 2] === 'P' && Number(s.slice(0, 2)) !== 12) {
        const step1 = s.split("");
        const step2 = (Number(s.slice(0, 2)) + 12).toString();
        step1.splice(0, 2, step2);
        return step1.join("").slice(0, 8);
    } else if (s[s.length - 2] === 'A' && Number(s.slice(0, 2)) === 12) {
        return s.replace("12", "00").slice(0, 8);
    } else {
        return s.slice(0, 8);
    }
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = timeConversion(s);

    ws.write(result + '\n');

    ws.end();
}
