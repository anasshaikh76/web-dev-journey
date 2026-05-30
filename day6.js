//Problem 1 — Create an Array

{
    let fruits = ["apple", "banana", "mango", "orange"];

    console.log(fruits);
    console.log(fruits[0]);
    console.log(fruits[2]);
    console.log(fruits.length);
}

//Problem 2 — Modify Array

{
    let colors = ["red", "green", "blue"];
    colors[1] = "yellow";
    console.log(colors);
}

//Problem 3 — push & pop

{
    let numbers = [1, 2, 3];
    numbers.push(4);
    numbers.push(5);
    console.log(numbers);

    numbers.pop();
    console.log(numbers);
}

//Problem 4 — shift & unshift

{
    let items = ["b", "c", "d"];
    items.unshift("a");
    console.log(items);

    items.shift();
    console.log(items);
}

//Problem 5 — Loop through Array

{
    let students = ["Anas", "Ahmed", "Ali", "Sara"];

    for (let i = 0; i < students.length; i++) {
        console.log(`Student ${i + 1}: ${students[i]}`);
    }
}

//Problem 6 — forEach loop (Modern way)

{
    let numbers = [1, 2, 3, 4, 5];

    numbers.forEach(function(num) {
        console.log(num * 2);
    });
        numbers.forEach(num => console.log(num * 2));
    
}
//Note: forEach is cleaner than writing a full for loop for arrays!

//Problem 7 — indexOf & includes

{
    let cities = ["Hyderabad", "Mumbai", "Delhi", " Chennai"];

    console.log(cities.indexOf("Hyderabad"));
    console.log(cities.indexOf("Pune"));
    console.log(cities.includes("Mumbai"));
    console.log(cities.includes("Pune"));
}

//Problem 8 — splice (add/remove anywhere)

{
    let months = ["Jan", "Feb", "Apr", "May"];
    months.splice(2,0,"Mar");
    console.log(months);

    months.splice(1,1);
    console.log(months);
}

//Problem 9 — slice (copy part of array)

{
    let numbers = [1, 2, 3, 4, 5, 6, 7];

    let first3 = numbers.slice(0,3);
    console.log(first3);

    let last3 = numbers.slice(4);
    console.log(last3);

    console.log(numbers);
}

//Problem 10 — map (transform array)

{
    let prices = [100, 200, 300, 400];

    let withTax = prices.map(price => price * 1.18);
    console.log(withTax);

    let double = prices.map(p => p * 2);
    console.log(double);
}
//Note: map creates a NEW array — original stays unchanged!

//Problem 11 — filter

{
    let ages = [15, 22, 17, 30, 14, 25];
    let adult = ages.filter(age => age >= 18);
    console.log(adult);

    let numbers = [1, 2, 3, 4, 5, 6, 7, 8];

    let even = numbers.filter(n => n % 2 === 0);
    console.log(even);
}

//Problem 12 — find & findIndex

{
    let score = [45, 78, 92, 55, 88];
    let scoreFind = score.find(s => s >= 60);
    console.log(scoreFind);

    let scoreFindIndex = score.findIndex(s => s >= 60);
    console.log(scoreFindIndex);
}

//Problem 13 — sort

{
    let names = ["Zara", "Anas", "Mia", "John"];
    names.sort();
    console.log(names);

    let nums = [40, 1, 5, 200];
    nums.sort((a, b) => a - b);
    console.log(nums);

    nums.sort((a, b) => b - a);
    console.log(nums);
}

//Problem 14 — reduce

{
    let numbers = [1, 2, 3, 4, 5];
    let sum = numbers.reduce((total,num) => total + num, 0);
    console.log(sum);

    let prices = [100, 200, 300];
    let total = prices.reduce((acc, price) => acc + price, 0);
    console.log(total);
}
//Note: reduce collapses entire array into single value — great for totals!

//Problem 15 — Mini Project: Student Marks

{
    let marks = [78, 92, 55, 88, 45, 96, 67];

    let total = marks.reduce((sum, m) => sum + m, 0);

    let average = (total / marks.length).toFixed(2);

    let highest = Math.max(...marks);
    let lowest = Math.min(...marks);

    let passed = marks.filter(m => m >= 60).length;
    let failed = marks.filter(m => m < 60).length;

    console.log(`Total Marks: ${total}`);
    console.log(`Average: ${average}`);
    console.log(`Highest: ${highest}`);
    console.log(`lowest: ${lowest}`);
    console.log(`Passed: ${passed}, Failed: ${failed}`);
}