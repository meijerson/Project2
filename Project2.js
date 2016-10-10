/**
 *   @author Bloswick, Mackenzie (bloswickm@student.ncmich.edu)
 *   @version 0.0.1
 *   @summary Project 2 beginning code || created: 10.10.2016
 *   @todo
 */

"use strict";
const PROMPT = require('readline-sync');

let continueProgram;
let policyNum, birthMonth, birthYear, premDueDate, recentAccidents, age, insurancePremium;
let currentYear = 2016;
let firstName, lastName;

function main() {
    process.stdout.write('\x1Bc');
    if (continueProgram == null) {
        setContinueProgram();
    }
    if (continueProgram === 1) {
        welcome();
        setPolicyNum();
        setName();
        setBirthMonth();
        setBirthYear();
        setPremDueDate();
        setRecentAccidents();
        calculateAge();
        setMonthlyInsurePrem();
        showResults();
        setContinueProgram();
        return main();
    }
    printGoodbye();
}
main();

function setContinueProgram() {
    if (continueProgram === 1) {
        continueProgram = Number(PROMPT.question(`\nWould you like to continue? [0=no, 1=yes]: `));
        if (continueProgram !== 0 && continueProgram !== 1) {
            console.log(`${continueProgram} is an incorrect value. Please try again.`);
            continueProgram = 1;
            return setContinueProgram();
        }
    } else {
        continueProgram = 1;
    }
}

function welcome() {
    console.log(`\n\tWelcome to the Drive-Rite Insurance Company. In order to calculate your monthly payment, we will ask you a few questions.
     \tThank you for your cooperation.` )
}

function setPolicyNum() {
    policyNum = PROMPT.question(`\nWhat is your Policy Number?: `);
}

function setName() {
    firstName = PROMPT.question(`\nWhat is your first name?: `);
    lastName = PROMPT.question(`\nWhat is your last name?: `);
}

function setBirthMonth() {
    birthMonth = PROMPT.question(`\nWhat month is your birthday in? Please enter as a number 1 through 12: `);
    if (birthMonth > 12 || birthMonth < 1) {
        console.log(`\n\tI'm sorry, ${birthMonth} is an invalid month. Please try again.`);
        return setBirthMonth();
    }
}

function setBirthYear() {
    birthYear = PROMPT.question(`\nWhat year were you born? YYYY: `);
    if (birthYear > 2016 || birthYear < 1900) {
        console.log(`\n\tI'm sorry, ${birthYear} is an invalid year. Please try again.`);
        return setBirthYear();
    }
}

function setPremDueDate() {
    let yearDue, monthDue, dayDue;

    yearDue = PROMPT.question(`\nWhat year is your premium due? YYYY: `);
    if (yearDue > 2100 || yearDue < currentYear) {
        console.log(`\n\tI'm sorry, that year is invalid. Please try again.`);
        return setPremDueDate();
    }
    monthDue = PROMPT.question(`\nWhat month is your premium due? Please enter a number 1 through 12: `);
    if (monthDue > 12 || monthDue < 1) {
        console.log(`\n\tI'm sorry, that month is invalid. Please try again.`);
        return setPremDueDate();
    }
    dayDue = PROMPT.question(`\nWhat day of the month is your premium due? Please enter a number 1 through 31: `);
    if (dayDue > 31 || dayDue < 1) {
        console.log(`\n\tI'm sorry, that date is invalid. Please try again.`);
        return setPremDueDate();
    }
    premDueDate = `${yearDue}/${monthDue}/${dayDue}`;
    console.log(`\n\tYour Premium Due date is ${premDueDate}.`)
}

function setRecentAccidents() {
    recentAccidents = PROMPT.question(`\nHow many at fault driving accidents have you been in in the past 3 years?: `)
}

function calculateAge() {
    if (birthMonth < 10)
        age = 2015 - birthYear;
    else
        age = 2016 - birthYear;
}

function setMonthlyInsurePrem() {
    insurancePremium = 0;
    const basePrice = 100,
        underHillPrice = 20,
        onHillPrice = 10,
        overHillPrice = 30,
        accidentPrice = recentAccidents * 50,
        youngest = 15,
        older = 30,
        evenOlder = 45,
        Oldest = 60;
    if (age > 0) {
        if (age > youngest && age < older) {
            insurancePremium = underHillPrice + basePrice + accidentPrice;
        } else if (age < evenOlder) {
            insurancePremium = onHillPrice + basePrice + accidentPrice;
        } else if (age < Oldest) {
            insurancePremium = basePrice + accidentPrice;
        } else {
            insurancePremium = overHillPrice + basePrice + accidentPrice;
        }
    }
}

function showResults() {
    console.log(`\n\tThank you ${firstName} ${lastName} for choosing the Drive-Rite Insurance Company.
    \n\tYour payment will be $${insurancePremium} per month.`);
}

function printGoodbye() {
    console.log(`\n\tThank you and goodbye.`)
}