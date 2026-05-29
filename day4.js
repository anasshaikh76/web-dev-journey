//Problem 1 — Basic for loop

{
    for(let i = 0; i <= 5; i++) {
        console.log(i);
    }
}

//Problem 2 — for loop with sum

{
    let sum = 0;

    for(let i = 0; i <= 10; i ++) {
        sum += i;
    }
    console.log(`Sum 1 to 10: ${sum}`);
}

//Problem 3 — for loop counting backwards

{
    for(let i = 10; i >= 1; i --) {
        console.log(i);
    }
}

//Problem 4 — for loop even numbers

{
    for(let i = 2; i <= 20; i += 2) {
        console.log(i);
    }
}
//Note: i += 2 means skip by 2 each time.


//Problem 5 — while loop

{
    let count = 1;

    while(count <= 5) {
        console.log(`Count: ${count}`);
        count++;
    }
}

//Problem 6 — while loop with user guess

{
    let secret = 7;
    let guess = 1;

    while(guess !== secret) {
        console.log(`${guess} is wrong, trying again..`);
        guess++;
    }
    console.log(`Found it! ${guess}`);
}

//Problem 7 — do...while loop

{
    let i = 1;

    do{
        console.log(`Running: ${i}`);
        i++;
    }while(i <= 3);
}
//Note: Key difference from while: do...while always runs at least once before checking condition.

//Problem 8 — break statement

{
    for(let i = 1; i <= 10; i++){
        if(i === 5){
            console.log("Stopping at 5");
            break;
        }
        console.log(i);
    }
    
}

//Problem 9 — continue statement

{
    for(let i = 1; i <= 10; i++) {
        if (i % 2 === 0) {
            continue;  //// skips even numbers
        }
        console.log(i);
    }
    // 1, 3, 5, 7, 9 (only odd numbers)
}

//Problem 10 — Nested loops

{
    for(let i = 1; i <= 3; i++){
        for(let j = 1; j <= 3; j++){
            console.log(`${i} x ${j} = ${i * j}`);
        }
    }
    //// Mini multiplication table
}

//Problem 11 — Loop through string

{
    let name = "Anas";

    for(let i = 0; i < name.length; i++){
        console.log(name[i]);
    }
}

//Problem 12 — Multiplication table

{
    let num = 5;

    for(let i = 1; i <= 10; i++){
        console.log(`${num} x ${i} = ${num * i}`);
    }
}

//Problem 13 — FizzBuzz (Classic interview question!)

{
   for (let i = 1; i <= 20; i++){
    if(i % 3 === 0 && i % 5 === 0){
        console.log("FizzBuzz");
    }else if(i % 3 === 0){
        console.log("Fizz");
    }else if(i % 5 === 0){
        console.log("Buzz");
    }else{
        console.log(i);
    }
   }
}
//⭐ Remember this one — FizzBuzz is asked in almost every beginner coding interview!

//Problem 14 — while loop with sum

{
    let num = 1;
    let total = 0;

    while (num <= 100){
        total += num;
        num++;
    }
    console.log(`Sum of 1 to 100 is: ${total}`);
}

//Problem 15 — Mini Project: Star Pattern

{
    for (let i = 1; i <= 5; i++){
        let stars = "";
        for(let j = 1; j <= i; j++){
            stars += "* ";
        }
        console.log(stars);
    }
}

//Project: Simple Number Guessing Game:

{
    let secret = 7;
    let guess = 1;
    let attempts = 0;

    while (guess !== secret){
        if (guess > secret){
            console.log(`${guess} is too high!`);
        }else if (guess < secret){
            console.log(`${guess} is too low!`);
        }
        guess++;
        attempts++;
    }
    console.log(`Correct! Answer was ${secret}. you took ${attempts} attempts`);
}