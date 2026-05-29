//Problem 1 — Basic Function

{
    function greet() {
        console.log("Hello!");
    }
    greet();  // calling the function
    greet();  // can call multiple times!
}

//Problem 2 — Function with Parameters

{
    function greet(name) {
        console.log(`Hello ${name} How Are You!`);
    }
    greet("Anas");
}

//Problem 3 — Function with Return

{
    function add(a, b) {
        return a + b;
    }
    let result = add(5, 3);
    console.log("result");
}
//Note: return sends a value back

//Problem 4 — Multiple Parameters

{
    function calculateArea(length, width) {
        return length * width;
    }
    console.log(calculateArea(10, 5));
    console.log(calculateArea(7, 3));
}

//Problem 5 — Default Parameters

{
    function greet(name = "Guest") {
        console.log(`Hello ${name}!`);
    }
    greet("Anas");
    greet(); //Hello Guest! (uses default)
}

//Problem 6 — Function Expression

{
    function add(a, b) {
        return a + b;
    }
    const multiply = function(a, b) {
        return a * b;
    }
    console.log(add(3,4));
    console.log(multiply(3, 4));
}

//Problem 7 — Arrow Function (Modern JS)

{
    function square(n) {
        return n * n;
    }
    //// Same as arrow function
    const squareArrow = (n) => n * n;

    console.log(square(5));
    console.log(squareArrow(5));
}
//Note: Arrow functions are shorter! You'll use these a lot in React!

//Problem 8 — Arrow Function variations

{
    //No Parameters
    const greet = () => console.log("Hello!");

    //1 Paramter
    const double = n => n * 2;

    //Multiple Parameter
    const add = (a, b) => a + b;

    const multiply = (a, b) => {
        let result = a * b;
        return result;
    }
    greet();
    console.log(double(5));
    console.log(add(3, 4));
    console.log(multiply(3, 4));

}

//Problem 9 — Function calling another Function

{
    function square(n) {
        return n * n;
    }
    function sumOfSquare(a, b) {
        return square(a) + square(b);
    }
    console.log(sumOfSquare(3, 4));
}

//Problem 10 — Function with if/else

{
    function getGrade(marks) {
        if (marks >= 90) return "A Grade";
        else if(marks >= 80) return "B Grade";
        else if(marks >= 70) return "C Grade";
        else if(marks >= 60) return "D Grade";
        else return "F Grade";
    }
    console.log(getGrade(91));
    console.log(getGrade(75));
    console.log(getGrade(40));
}

//Problem 11 — Function with Loop

{
    function printMultiplicationTabel(num) {
        for (let i = 1; i <= 10; i++){
            console.log(`${num} x ${i} = ${num * i}`);
        }       
    }
    printMultiplicationTabel(5);
}

//Problem 12 — Reusable Function

{
    function celsiusToFahrenheit(celsius) {
        return (celsius * 9/5) + 32;
    }
    console.log(celsiusToFahrenheit(0));
    console.log(celsiusToFahrenheit(100));
    console.log(celsiusToFahrenheit(37));
}

//Problem 13 — FizzBuzz as Function

{
    function fizzBuzz(n) {
        if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";
        else if(n % 3 === 0) return "Fizz";
        else if(n % 5 === 0) return "Buzz";
        else return n;
    }
    for (let i = 1; i <= 20; i++){
        console.log(fizzBuzz(i));
    }
}
//Note: You already know FizzBuzz from Day 4 — now it's cleaner as a function!

//Problem 14 — Higher Order Function

{
    function doMath(a, b, operator) {
        return operator(a, b);
    }
    const add = (a, b) => a + b;
    const multiply = (a, b) => a * b;

    console.log(doMath(5, 3, add));
    console.log(doMath(5, 3, multiply));
}
//Note: Passing a function as a parameter — this is a powerful concept you'll use a lot later!

//Problem 15 — Mini Project: Simple Calculator Function

{
    function calculator(a, b, operator) {
        switch(operator) {
            case "+": return a + b;
            case "-": return a - b;
            case "*": return a * b;
            case "/": return a / b;
            default: return("Invalid Operator");
        }
    }
    console.log(calculator(10, 5, "+"));
    console.log(calculator(10, 5, "-"));
    console.log(calculator(10, 5, "*"));
    console.log(calculator(10, 5, "/"));
}