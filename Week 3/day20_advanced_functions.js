// Problem 1 — Callback Basic

{
    function greet(name, callback) {
        console.log("Hello " + name);
        callback();
    }
    function sayBye() {
        console.log("GoodBye!");
    }

    greet("Anas", sayBye);
}
// Note: A callback is just a function passed INTO another function. You already used callbacks — addEventListener("click", function(){}) — that function is a callback! ✅

// Problem 2 — Callback with data

{
    function calculate(a, b, operation) {
        return operation(a, b);
    }
    function add(x, y) { return x + y}
    function multiply(x, y) { return x * y}

    console.log(calculate(5, 3, add));
    console.log(calculate(5, 3, multiply));
}
// Note: operation is a callback — you decide what operation to do when calling the function!

// Problem 3 — Anonymous Callback

{
    function doMath(a, b, callback) {
        let result = callback(a, b);
        console.log(`Result: ${result}`);
    }

    doMath(10, 5, (a, b) => a + b);
    doMath(10, 5, (a, b) => a * b);
    doMath(10, 5, (a, b) => a - b);
}

// Problem 4 — forEach is a callback!

{
    let numbers = [1, 2, 3, 4, 5];

    numbers.forEach(function(num) {
        console.log(num * 2);
    })

    numbers.forEach(num => console.log(num * 3));
}
// Note: You've been using callbacks since Day 6 without knowing it! forEach, map, filter all take callbacks!

// Problem 5 — map callback

{
    let prices = [100, 200, 300, 400, 500];

    let discounted = prices.map(price => price * 0.9);
    console.log(discounted);

    let withTax = prices.map(price => price * 1.18);
    console.log(withTax);
}

// Problem 6 — filter callback

{
    let students = [
        { name: "Anas", marks: 92},
        { name: "Ahmed", marks: 55 },
        { name: "Sara", marks: 78 },
        { name: "Ali", marks: 45 },
        { name: "Zara", marks: 88 }
    ];

    let passed = students.filter(sm => sm.marks > 60);
    let failed = students.filter(sm => sm.marks < 60);

    console.log("Passed:", passed.map(sm => sm.name));
    console.log("Failed:", failed.map(sm => sm.name));
}

// Problem 7 — Higher Order Function

{
    // A function that RETURNS another function
    function multiplier(factor) {
        return function(number) {
            return number * factor;
        };
    }

    let double = multiplier(2);
    let triple = multiplier(3);
    let times10 = multiplier(10);

    console.log(double(5));
    console.log(triple(5));
    console.log(times10(5));
}
// Note: multiplier is a higher order function — it returns a function! double is now a function that multiplies by 2!

// Problem 8 — Closure

{
    function counter() {
        let count = 0;

        return {
            increment: function() { count++ , console.log(count);},
            decrement: function() { count--, console.log(count);},
            getCount: function() { return count;}
        };
    }
    let myCounter = counter();
    myCounter.increment();
    myCounter.increment();
    myCounter.increment();
    myCounter.decrement();
    console.log(myCounter.getCount());
}
// Note: count is private — you can't access it directly, only through the functions. This is a closure — the inner functions remember the outer variable even after counter() finished running!

// Problem 9 — Closure practical use

{
    function bankAccount(initialBalance) {
        let balance = initialBalance;

        return {
            deposit: function(amount) {
                balance += amount;
                console.log(`Deposited ${amount}. Balance: ${balance}`);
            },
            withdraw: function(amount) {
                if (amount > balance) {
                    console.log("!Insufficient Funds");
                } else {
                    balance -= amount;
                    console.log(`Withdrew ${amount}. Balance: ${balance}`);
                }
            },
            getBalance: function() {
                console.log(`Balance: ${balance}`);
            }
        };
    }

    let account = bankAccount(1000);
    account.deposit(500);
    account.withdraw(200);
    account.withdraw(2000);
    account.getBalance();
}
// Note: balance is completely private — nobody can change it directly, only through deposit/withdraw. This is how real banking apps protect data!

// Problem 10 — Function that returns function

{
    function greetMaker(greeting) {
        return function(name) {
            console.log(`${greeting} ${name}`);
        };
    }

    let sayHello = greetMaker("Hello")
    let sayHi = greetMaker("Hi")
    let sayHey = greetMaker("Hey");

    sayHello("Anas");
    sayHi("Ahmed");
    sayHey("Sara");
}

// Problem 11 — setTimeout callback

{
    console.log("Start");

    setTimeout(function() {
        console.log("Runs after 2 seconds");
    }, 2000);

    console.log("End");
}
// Note: setTimeout takes a callback and runs it after a delay. Notice "End" prints BEFORE the timeout message — JavaScript doesn't wait!

// Problem 12 — setInterval callback

{
    let count = 0;

    let timer = setInterval(function(){
        count++;
        console.log(`Count: ${count}`);

        if (count >= 5) {
            clearInterval(timer);
                console.log("Timer Stopped");
        }
    }, 1000);
}
// Note: setInterval runs callback every X milliseconds. clearInterval stops it. Used for clocks, countdowns, animations!

// Problem 13 — Chaining callbacks

{
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let result = numbers
        .filter(n => n % 2 === 0)     // keep evens: [2,4,6,8,10]
        .map(n => n * n)               // square them: [4,16,36,64,100]
        .filter(n => n > 20)           // keep >20: [36,64,100]
        .reduce((sum, n) => sum + n, 0); // add them: 200

    console.log(result); // 200
}

// Problem 14 — Once function

{
    function once(callback) {
        let hasRun = false;

        return function() {
            if (!hasRun) {
                hasRun = true;
                callback();
            }
        };
    }

    let greetOnce = once(function() {
        console.log("Hello!");
    });

    greetOnce();
    greetOnce();
    greetOnce();
}