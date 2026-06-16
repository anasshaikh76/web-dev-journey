// Problem 1 — let & const (Review)

{
    // var (old way - avoid!)
    var name1 = "old";

    // let (block scoped - use for variables)
    let name2 = "Anas";
    name2 = "Ahmed";

    // const (block scoped - use for constants)
    const name3 = "Anas";
    // name3 = "Ahmed"; // ❌ ERROR!

    console.log(name2);
    console.log(name3);
}
// Note: Always use const by default. Only use let when you need to reassign. Never use var!

// Problem 2 — Template Literals (Review + Advanced)

{
    const name = "Anas";
    const age = 20;
    const city = "Hyderabad";

    // Multi-line strings!
    let message = `
        name: ${name}
        age: ${age}
        city: ${city}
    `;

    console.log(message);

    // Expression inside ${}
    console.log(`Next year you'll be ${age + 1}`);
    console.log(`Is Adult: ${age >= 18 ? "Yes" : "No"}`);
}

// Problem 3 — Arrow Functions (Review + Advanced)

{
    // Regular function
    function add(a, b) { return a + b; }

    // Arrow function
    const addArrow = (a, b) => a + b;

    // No parameters
    const greet = () => "Hello!";

    // One parameter (no brackets needed)
    const double = n => n * 2;

    // Multiple lines need {} and return
    const multiply = (a, b) => {
        const result = a * b;
        return result;
    };

    console.log(add(3, 4));
    console.log(addArrow(3, 4));
    console.log(greet());
    console.log(double(5));
    console.log(multiply(3, 4));
}

// Problem 4 — Destructuring Objects

{
    const person = {
        name: "Anas",
        age: 20,
        city: "Hyderabad",
        job: "Developer"
    };

    // Old way
    const name1 = person.name;
    const age1 = person.age;

    // Destructuring (modern!)
    const { name, age, city, job } = person;
    console.log(name, age, city, job);

    // Rename while destructuring
    const { name: fullName, age: years } = person;
    console.log(fullName, years); // Anas 20

    // Default values
    const { country = "India" } = person;
    console.log(country); // India (default since not in object)
}

// Problem 5 — Destructuring Arrays

{
    const colors = ["red", "green", "blue", "yellow"];

    // Old way
    const first1 = colors[0];
    const second1 = colors[1];

    // Destructuring
    const [first, second, third] = colors;
    console.log(first, second, third); // red green blue

    // Skip elements with comma
    const [, , thirdColor] = colors;
    console.log(thirdColor); // blue

    // Rest operator
    const [head, ...rest] = colors;
    console.log(head); // red
    console.log(rest); // ["green", "blue", "yellow"]
}

// Problem 6 — Spread Operator

{
    // Spread arrays
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    const combined = [...arr1, ...arr2];
    console.log(combined); // [1,2,3,4,5,6]

    // Copy array
    const original = [1, 2, 3];
    const copy = [...original];
    copy.push(4);
    console.log(original); // [1,2,3] unchanged!
    console.log(copy);     // [1,2,3,4]

    // Spread objects
    const basics = { name: "Anas", age: 20 };
    const extra = { city: "Hyderabad", job: "Dev" };
    const merged = { ...basics, ...extra };
    console.log(merged);
}

// Problem 7 — Rest Parameters

{
    // Accept any number of arguments
    function sum(...numbers) {
        return numbers.reduce((total, n) => total + n, 0);
    }

    console.log(sum(1, 2, 3));          // 6
    console.log(sum(1, 2, 3, 4, 5));    // 15
    console.log(sum(10, 20, 30, 40));   // 100

    // Mix with regular params
    function introduce(greeting, ...names) {
        return `${greeting} ${names.join(", ")}!`;
    }
    console.log(introduce("Hello", "Anas", "Ahmed", "Sara"));
    // Hello Anas, Ahmed, Sara!
}
// Note: ...rest collects remaining arguments into an array — opposite of spread!

// Problem 8 — Default Parameters

{
    // Old way
    function greetOld(name) {
        name = name || "Guest";
        return "Hello " + name;
    }

    // Modern way with default params
    function greet(name = "Guest", greeting = "Hello") {
        return `${greeting} ${name}!`;
    }

    console.log(greet());                    // Hello Guest!
    console.log(greet("Anas"));             // Hello Anas!
    console.log(greet("Anas", "Welcome")); // Welcome Anas!
}

// Problem 9 — Short Circuit Evaluation

{
    // && returns first falsy OR last value
    console.log(true && "Hello");   // Hello
    console.log(false && "Hello");  // false
    console.log(null && "Hello");   // null

    // || returns first truthy OR last value
    console.log(false || "Default");  // Default
    console.log("Anas" || "Guest");   // Anas
    console.log(null || "Guest");     // Guest

    // ?? (nullish coalescing) - only null/undefined
    let username = null;
    console.log(username ?? "Guest"); // Guest

    let score = 0;
    console.log(score || "No score"); // No score (wrong!)
    console.log(score ?? "No score"); // 0 (correct! 0 is valid)
}
//  Use ?? instead of || when 0 or "" are valid values!

// Problem 10 — Optional Chaining

{
    const user = {
        name: "Anas",
        address: {
            city: "Hyderabad"
        }
    };

    // Without optional chaining - CRASHES if missing!
    // console.log(user.phone.number); // ❌ ERROR

    // With optional chaining - returns undefined safely
    console.log(user.address?.city);    // Hyderabad
    console.log(user.phone?.number);    // undefined (no crash!)
    console.log(user.address?.pincode); // undefined

    // Great for API data where fields might be missing
    const users = [
        { name: "Anas", job: { title: "Developer" } },
        { name: "Ahmed" } // no job
    ];

    users.forEach(u => {
        console.log(`${u.name}: ${u.job?.title ?? "Unemployed"}`);
    });
}

// Problem 11 — Array Methods (Advanced)

{
    const students = [
        { name: "Anas", grade: 92, passed: true },
        { name: "Ahmed", grade: 65, passed: true },
        { name: "Sara", grade: 45, passed: false },
        { name: "Ali", grade: 88, passed: true },
        { name: "Mia", grade: 30, passed: false }
    ];

    // filter → only passed students
    const passed = students.filter(s => s.passed);
    console.log("Passed:", passed.length); // 3

    // map → get just names
    const names = students.map(s => s.name);
    console.log("Names:", names);

    // find → first student with grade > 90
    const topStudent = students.find(s => s.grade > 90);
    console.log("Top:", topStudent.name); // Anas

    // every → did ALL students pass?
    const allPassed = students.every(s => s.passed);
    console.log("All passed:", allPassed); // false

    // some → did ANY student get > 90?
    const anyExcellent = students.some(s => s.grade > 90);
    console.log("Any excellent:", anyExcellent); // true

    // sort by grade descending
    const sorted = [...students].sort((a, b) => b.grade - a.grade);
    console.log("Top student:", sorted[0].name); // Anas
}

// Problem 12 — Chaining Array Methods

{
    const products = [
        { name: "Phone", price: 20000, inStock: true },
        { name: "Laptop", price: 80000, inStock: true },
        { name: "Tablet", price: 30000, inStock: false },
        { name: "Watch", price: 5000, inStock: true },
        { name: "Speaker", price: 8000, inStock: true }
    ];

    // Chain: filter → sort → map
    const result = products
        .filter(p => p.inStock)           // only in stock
        .filter(p => p.price <= 30000)    // affordable
        .sort((a, b) => a.price - b.price) // cheapest first
        .map(p => `${p.name}: ₹${p.price}`); // format

    console.log(result);
    // ["Watch: ₹5000", "Speaker: ₹8000", "Phone: ₹20000"]
}
// Note: Chaining methods together is very common in real code — each method returns a new array for the next one!

// Problem 13 — Object Methods

{
    const person = {
        name: "Anas",
        age: 20,
        city: "Hyderabad",
        skills: ["HTML", "CSS", "JS"]
    };

    // Object.keys → array of keys
    console.log(Object.keys(person));
    // ["name", "age", "city", "skills"]

    // Object.values → array of values
    console.log(Object.values(person));

    // Object.entries → array of [key, value] pairs
    Object.entries(person).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    });

    // Object.assign → merge objects
    const extra = { job: "Developer", country: "India" };
    const merged = Object.assign({}, person, extra);
    console.log(merged.job); // Developer
}

// Problem 14 — Ternary & Nullish in Practice

{
    // Real world examples
    const user = { name: "Anas", age: 20, premium: true };

    // Ternary for display
    const status = user.premium ? "Premium ⭐" : "Free";
    console.log(status); // Free

    // Nullish for defaults
    const displayName = user.username ?? user.name;
    console.log(displayName); // Anas

    // Optional chaining + nullish
    const avatar = user.profile?.avatar ?? "default.png";
    console.log(avatar); // default.png

    // Nested ternary (use sparingly!)
    const ageGroup = user.age < 13 ? "child"
                   : user.age < 18 ? "teen"
                   : user.age < 60 ? "adult"
                   : "senior";
    console.log(ageGroup); // adult
}

// Problem 15 — Mini Project: Modern Student Manager

{
    const students = [
        { id: 1, name: "Anas", grades: [92, 88, 95, 90] },
        { id: 2, name: "Ahmed", grades: [70, 65, 72, 68] },
        { id: 3, name: "Sara", grades: [45, 50, 42, 48] },
        { id: 4, name: "Ali", grades: [85, 90, 88, 92] },
        { id: 5, name: "Mia", grades: [30, 35, 28, 40] }
    ];

    // Process each student using ES6 features
    const report = students.map(({ name, grades }) => {
        const avg = grades.reduce((a, b) => a + b, 0) / grades.length;
        const grade = avg >= 90 ? "A" : avg >= 75 ? "B"
                    : avg >= 60 ? "C" : "F";
        const status = avg >= 60 ? "Passed ✅" : "Failed ❌";
        return { name, avg: avg.toFixed(1), grade, status };
    });

    // Print report
    console.log("===== STUDENT REPORT =====");
    report.forEach(({ name, avg, grade, status }) => {
        console.log(`${name}: ${avg}% | Grade: ${grade} | ${status}`);
    });

    // Stats using array methods
    const passed = report.filter(s => s.status.includes("✅"));
    const topStudent = report.sort((a, b) => b.avg - a.avg)[0];

    console.log(`\nPassed: ${passed.length}/${students.length}`);
    console.log(`Top student: ${topStudent.name} (${topStudent.avg}%)`);
}