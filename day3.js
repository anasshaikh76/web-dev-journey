//Problem 1 — Basic if/else

{
    let age = 20;

if (age >= 18) {
    console.log("You Are An Adult");
}else{
    console.log("You Are a Minor");
}
}

//Problem 2 — else if

{
    let score = 75;

if (score >= 90){
    console.log("A Grade");
}else if (score >= 80){
    console.log("B Grade");
}else if (score >= 70){
    console.log("C Grade");
}else{
    console.log("F Grade");
}
}

//Problem 3 — Nested if

{
    let age = 20;
let hasID = true;

if (age >= 18){
    if (hasID) {
        console.log("Entry Allowed");
    }else{
        console.log("Need ID");
    }
}else{
    console.log("You Are Too Young");
}
}

{
    let age = 20;
    let isMember = true;

    if (age >= 18 && isMember){
        console.log("Welcome Member!");
    }
    if (age < 18 || !isMember){
        console.log("Access Denied");
    }else{
        console.log("Access Granted");
    }
}

//Problem 5 — Ternary Operator (Shortcut if/else)

{
    let age = 20;

    if (age >= 18){
        console.log("Adult");
    }else{
        console.log("Minor");
    }

    let result = age >=18 ? "Adult" : "Minor"
    console.log(result);
}
//Syntax: condition ? valueIfTrue : valueIfFalse

//Problem 6 — Switch Statement

{
    let day = "Monday";

    switch(day) {
        case "Monday":
            console.log("Start Of The Work Week");
            break
        case "Friday":
            console.log("End Of The Work Week");
            break
        case "Saturday":
        case "Sunday":
            console.log("Weekend!");
        default:
            console.log("MidWeek");
    }
}
//Note: Always add break after each case or it runs all cases below it!

//Problem 7 — Switch vs if/else

{
// With if/else
    let traffic = "red";

    if (traffic === "red"){
        console.log("Stop!");
    }else if (traffic === "yellow"){
        console.log("Slow Down");
    }else if (traffic === "green"){
        console.log("Go");
    }

// With switch (cleaner for multiple exact values)
switch(traffic){
    case "red":
        console.log("Stop!");
        break
    case "yellow":
        console.log("Slow Down");
        break
    case "green":
        console.log("Go");
        break
}
}
//Rule: Use switch when checking one variable against many exact values. Use if/else for ranges like score >= 90.

//Problem 8 — Truthy/Falsy conditions

{
    let username = "";

    if (username){
        console.log("Welcome" + username);
    }else{
        console.log("Please Enter A Username");
    }

    let username2 = "Anas";

    if (username2){
        console.log("Welcome" + ' ' + username2);
    }
}

//Problem 9 — Number Checker

{
    let number = 15;

    if (number > 0){
        console.log("Positive");
    }else if (number < 0){
        console.log("Negative");
    }else{
        console,log("Zero");
    }

    // Bonus: Check even or odd
    if (number % 2 === 0){
    console.log("Even Number");
    }else{
    console.log("Odd Number");
    }
}

//Problem 10 — Login System

{
    let username = "Anas";
    let password = "1234";

    if (username === "Anas" && password === "1234"){
        console.log("Loggin Succesful");
    }else if (username !== "Anas"){
        console.log("Invalid Username");
    }else{
        console.log("Invalid Password");
    }
}

//Problem 11 — Season Checker

{
    let month = 7;
    let season;

    if (month >= 3 && month <= 5){
        season = "Spring";
    }else if (month >= 6 && month <= 8){
        season = "Summer";
    }else if (month >= 9 && month <= 11){
        season = "Autumn";
    }else{
        season = "Winter";
    }
    console.log(`Month ${month} is ${season}`);
}

//Problem 12 — Ternary Chaining

{
    let marks = 85;
    let grade = marks >= 90 ? "A" :
                marks >= 80 ? "B" :
                marks >= 70 ? "C" : "F"
    
    console.log(`Grade ${grade}`);
}

//Problem 13 — Switch with Numbers

{
    let dayNum = 3;
    let dayName;

    switch(dayNum){
        case 1:
            dayName = "Monday";
            break
        case 2:
            dayName = "Tuesday";
            break
        case 3:
            dayName = "Wednesday";
            break
        case 4:
            dayName = "Thursday";
            break
        case 5:
            dayName = "Friday";
        default:
            dayName = "Weekend";
    }
    console.log(dayName);
}

//Problem 14 — Nullish Coalescing (Modern JS)

{
    let userCity = null;
    let city = userCity ?? "Hyderabad";
    console.log(city);

    let userCity2 = "Mumbai";
    let city2 = userCity2 ?? "Hyderabad";
    console.log(city2)
}
//Note: ?? means "if left side is null or undefined, use right side." Very useful for default values!

//Problem 15 — Mini Project: Simple Calculator

{
    let num1 = 10;
    let num2 = 5
    let operator = "*";
    let result;

    switch(operator){
        case "+":
            result = num1 + num2;
            break
        case "-":
            result = num1 - num2;
            break
        case "*":
            result = num1 * num2;
            break
        case "/":
            result = num1 / num2;
            break
        default:
            result = "Invalid Operator";
    }
    console.log(`${num1} ${operator} ${num2} = ${result}`);
}
//Try changing operator to -, *, / and run again!