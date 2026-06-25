// 1 — Variables & Data Types

{
    const name = "Anas";
    let age = 20;
    let isStudent = true;
    let score = null;

    console.log(`My name is ${name} and i am ${age} yeras old!`);
    console.log(typeof name, typeof age, typeof isStudent, typeof score);
}

// 2 — Operators & Conversion

{
    let price = "499";
    let quantity = "3";

    let total = Number(price) * Number(quantity);
    console.log(`Total: ${total}`);
    console.log(10 === "10");
    console.log(10 == "10");
}

// 3 — Conditionals

{
    let score = 85;
    let grade = score >= 90 ? "A":
                score >=80 ? "B":
                score >=70 ? "c": "F";
    console.log(`Grade: ${grade}`);

    let day = "Monday";
    switch(day) {
        case "Monday" : console.log("Start of the week");
        case "Friday" : console.log("End of week");
        default : console.log("Midweek");
    }
}

// 4 — Loops

{
    // FizzBuzz — classic interview question!
    for (i = 1; i <= 20; i++) {
        if (i % 3 === 0 && i % 5 === 0) console.log("FizzBuzz");
        else if (i % 3 === 0) console.log("Fizz");
        else if (i % 5 === 0) console.log("Buzz");
        else console.log(i);
    }   
}

// 5 — Functions & Arrow Functions

{
    function greet(name = "Guest") {
        return `Hello ${name}`;
    }

    const double = n => n * 2;

    const numbers = [1,2,3,4,5];
    const doubled = numbers.map(n => double(n));

    console.log(greet("Anas"));
    console.log(doubled);
}

// 6 — Arrays & Methods

{
    const students = [
        { name: "Anas", grade: 92 },
        { name: "Ahmed", grade: 55 },
        { name: "Sara", grade: 78 },
        { name: "Ali", grade: 40 }
    ];

    const passed = students.filter(s => s.grade >= 60);
    const names = students.map(s => s.name);
    const top = students.find(s => s.grade > 90);
    const total = students.reduce((sum, s) => sum + s.grade, 0);

    console.log("Passed:", passed.length);
    console.log("Names:", names);
    console.log("Top student:", top.name);
    console.log("Average:", (total / students.length).toFixed(1));
}

// 7 — Objects

{
    const student = {
        name : "Anas",
        age : 20,
        skills : ["HTML", "CSS", "JAVASCRIPT"],
        getInfo() {
            return `${this.name} knows: ${this.skills.join(", ")}`;
        }
    };

    const { name, age, skills } = student;
    console.log(name, age);
    console.log(student.getInfo());

    const update = {...student, city : "Hyderabad"};
    console.log(update.city);
}

// 8 — ES6+ Features

{
    const [first, ...rest] = [1, 2, 3, 4, 5];
    console.log(first);
    console.log(rest);

    const username = null;
    console.log(username ?? "Guest");

    const user = {profile: { city: "Hyderabad"}};
    console.log(user.profile?.city);
    console.log(user.addredd?.city);
}

// 9 — Promises & Async/Await

{
    function fakeApi(success) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (success) resolve({ data : "User Loaded"});
                else reject("Server error!");
            }, 1000);
        });
    }

    async function LoadData() {
        try {
            const result = await fakeApi(true);
            console.log("✅", result.data);

            const failed = await fakeApi(false);
        } catch (error) {
            console.log("❌", error);
        }
    }
    LoadData();
}

// 10 — JSON

{
    const user = { name : "Anas", skills : ["HTML", "CSS", "JAVASCRIPT"]};
    const jsonStringify = JSON.stringify(user, null, 2);
    console.log(jsonStringify);

    const parsed = JSON.parse(jsonStringify);
    console.log(parsed.skills[0]);

    try {
        JSON.parse("${invalid}");
    } catch (error) {
        console.log("Invalid JSON caught!");
    }
}

// 11 — Classes & OOP

{
    class Animal {
        constructor(name, sound) {
            this.name = name;
            this.sound = sound;
        }
        speak() {
            return `This ${this.name} says ${this.sound};`
        }
    }

    class Dog extends Animal {
        constructor(name, breed) {
            super(name, "Woof");
            this.breed = breed;
        }
        getInfo() {
            return `${this.name} is ${this.breed}`;
        }
    }

    const dog = new Dog("Rex", "Labrador");
    console.log(dog.speak());
    console.log(dog.getInfo());
}

