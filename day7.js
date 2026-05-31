//Problem 1 — Create an Object

{
    let person = {
        name: "Anas",
        age: 20,
        city: "Hyd",
        isStudent: true,
    };

    console.log(person);
    console.log(person.name);
    console.log(person["age"]);
}

//Problem 2 — Modify Object

{
    let car = {
        brand: "Toyota",
        model: "Corolla",
        year: 2020,
    };
    car.year = 2024;
    car.color = "white";
    delete car.model;

    console.log(car);
}

//Problem 3 — Object with Methods

{
    let calculator = {
        add: function(a, b) { return a + b; },
        subtract: (a, b) => a - b,
        multiply: (a, b) => a * b
    };

    console.log(calculator.add(5, 3));  
    console.log(calculator.subtract(5, 3)); 
    console.log(calculator.multiply(5, 3)); 
}
//Note: Functions inside objects are called methods!

//Problem 4 — this keyword

{
    let student = {
        name: "Anas",
        age: 20,
        greet: function() {
            console.log(`Hi i am ${this.name} and i am ${this.age} years old`)
        }
    }
    student.greet();
}
//Note: this refers to the current object

//Problem 5 — Nested Object

{
    let person = {
        name: "Anas",
        address: {
            city: "Hyderabad",
            state: "Telangana",
            pincode: 500001,
        }
    }

    console.log(person.address.city);
    console.log(person.address.pincode);
}

//Problem 6 — Object with Array

{
    let student = {
        name: "Anas",
        marks: [85, 92, 78, 96, 88],
        getAverage: function(){
            let sum = this.marks.reduce((a, b) => a + b, 0);
            return (sum/ this.marks.length).toFixed(2);
        }
    }

    console.log(student.name);
    console.log(student.marks[0]);
    console.log(student.getAverage());
}

//Problem 7 — Object.keys, Object.values

{
    let phone = {
        brand: "Samsung",
        model: "S24",
        price: 80000,
        color: "black"
    }
    console.log(Object.keys(phone));
    console.log(Object.values(phone));
}

//Problem 8 — Loop through Object

{
    let scores = {
        maths: 95,
        english: 88,
        science: 92,
        history: 78
    }
    for (let subject in scores) {
        console.log(`${subject}: ${scores[subject]}`);
    }
}
//Note: for...in loop is specifically for objects!

//Problem 9 — Destructuring

{
    let person = {
        name: "Anas",
        age: 20,
        city: "Hyderabd"
    }

    let name1 = person.name;
    let gae1 = person.age;

    let { name, age, city} = person;
    console.log(name);
    console.log(age);
    console.log(city);
}
//Note: Destructuring is used everywhere in React — learn it well!

//Problem 10 — Spread with Objects

{
    let basics = { name: "Anas", age: 20};
    let extras = { city: "Hyerabad", job: "Developer"};

    let fullProfile = {...basics, ...extras};

    console.log(fullProfile);
}

//Problem 11 — Array of Objects]

{
    let students = [
        { name: "Anas", grade: "A" },
        { name: "Ahmed", grade: "B" },
        { name: "Sara", grade: "A" },
    ];

    students.forEach(student => {
        console.log(`${student.name}: ${student.grade}`);
    });
}
//Note: Array of objects is how real data looks — like database records!

//Problem 12 — Filter Array of Objects

{
    let products = [
        { name: "Phone", price: 20000},
        { name: "Laptop", price: 80000},
        { name: "Tablet", price: 30000},
        { name: "Wtach", price: 5000}
    ]
    let affordable = products.filter(p => p.price <= 30000);
    affordable.forEach(p => console.log(`${p.name}: ${p.price}`));
}

//Problem 13 — Optional Chaining

{
    let user ={
        name: "Anas",
        address: {
            city: "Hyderabd"
        }
    }
    console.log(user.address?.city);
    console.log(user.phone?.number);
}
//Note: ?. prevents crashes when accessing properties that might not exist!

//Problem 14 — Object Shorthand

{
    let name = "Anas";
    let age = 20;
    let city = "Hyderabad";

    let person1 = {name: name, age: age, city: city};

    let person2 = { name, age, city};

    console.log(person2);
}

//Problem 15 — Mini Project: Student Report Card

{
    let student = {
        name: "Anas Shaikh",
        rollNo: 101,
        subjects: {
            maths: 92,
            english: 85,
            science: 96,
            history: 78,
            computer: 98
        },
        getAverage: function() {
            let marks = Object.values(this.subjects);
            let sum = marks.reduce((a, b) => a + b, 0);
            return (sum / marks.length).toFixed(2);
        },
        getGrade: function() {
            let avg = this.getAverage();
            if (avg >= 90) return "A+";
            else if (avg >= 80) return "A";
            else if (avg >= 70) return "B";
            else return "C";
        }
    };

    console.log(`Student: ${student.name}`);
    console.log(`Roll No: ${student.rollNo}`);
    console.log(`Average: ${student.getAverage()}`);
    console.log(`Grade: ${student.getGrade()}`);

    for (let subject in student.subjects) {
        console.log(`${subject}: ${student.subjects[subject]}`);
    }
}