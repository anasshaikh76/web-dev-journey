// Question 1 — Variables & Types (Easy)
// Write a function that takes a value and returns what type it is in a readable way:
// Input: 42        → Output: "42 is a number"
// Input: "hello"   → Output: "hello is a string"
// Input: true      → Output: "true is a boolean"
// Input: null      → Output: "null is null"
// Input: undefined → Output: "undefined is undefined"

{
    const num = 42;
    const greet = "hello";
    const isStudent = true;
    let identity = null;
    let age = undefined;

    console.log(typeof num);
    console.log(typeof greet);
    console.log(typeof isStudent);
    console.log(typeof identity);
    console.log(typeof undefined);
}


// Question 2 — Array Methods (Easy)
// Given this array:
// jsconst products = [
//     { name: "Phone", price: 20000, inStock: true },
//     { name: "Laptop", price: 80000, inStock: false },
//     { name: "Watch", price: 5000, inStock: true },
//     { name: "Tablet", price: 30000, inStock: true },
//     { name: "Speaker", price: 8000, inStock: false }
// ];
// Without looking at notes, write code to:
// Get only inStock products
// Get names of all products
// Get total price of all products
// Find the most expensive product
// Sort by price lowest to highest

{
    const products = [
        { name: "Phone", price: 20000, inStock: true },
        { name: "Laptop", price: 80000, inStock: false },
        { name: "Watch", price: 5000, inStock: true },
        { name: "Tablet", price: 30000, inStock: true },
        { name: "Speaker", price: 8000, inStock: false }
    ];

    const stocked = products.filter(p => p.inStock === true);
    const names = products.map(p => p.name);
    const total = products.reduce((sum, p) => sum + p.price, 0);
    const expensive = products.find(p => p.price > 50000);
    const sorted = products.sort((a, b) => a.price - b.price)

    console.log("InStock:", stocked);
    console.log("Name:", names);
    console.log("Total:", total);
    console.log("Expensive:", expensive);
    console.log("Sorted:", sorted)
}

// Question 3 — Destructuring & Spread (Medium)
// jsconst user = {
//     name: "Anas",
//     age: 20,
//     address: { city: "Hyderabad", country: "India" },
//     skills: ["HTML", "CSS", "JS", "Git"]
// };
// Write code to:

// Destructure name, age and city in one line
// Add a new skill "React" without modifying original array
// Create a new object with all user properties plus { role: "Developer" }
// Get first skill and remaining skills separately using rest operator

{
    const user = {
        name: "Anas",
        age: 20,
        address: { city: "Hyderabad", country: "India" },
        skills: ["HTML", "CSS", "JS", "Git"]
    };

    const { name, age, city } = user;
    const newSkill = { ...user, skills: [...user.skills, "React"] };
    const newObject = { ...user, role: "Developer" };
    const [first, ...rest] = ["HTML", "CSS", "JS", "Git"];

    console.log(user);
    console.log(newSkill);
    console.log(newObject.role);
    console.log(first);
    console.log(...rest);
}

// Question 4 — Classes (Medium)
// Build a TodoList class from scratch with:
// Constructor that initializes empty array
// add(task) method — adds task object {id, text, done: false}
// complete(id) method — marks task as done
// remove(id) method — removes task
// getPending() method — returns only incomplete tasks
// getStats() method — returns {total, done, pending}

{
    class TodoList {
        constructor() {
            this.tasks = [];
        }

        add(task) {
            this.tasks.push({ id: task.id, text: task.text, done: task.done || false });
        }

        complete(id) {
            this.tasks.find(t => t.id === id).done = true;
        }

        remove(id) {
            this.tasks = this.tasks.filter(t => t.id !== id);
        }

        getPending() {
            return this.tasks.filter(t => !t.done);
        }

        getStats() {
            const total = this.tasks.length;
            const done = this.tasks.filter(t => t.done).length;
            return { total, done, pending: total - done };
        }
    }

    const list = new TodoList();

    list.add({ id: 1, text: "learn jS" });
    list.add({ id: 2, text: "Build Project" });
    list.complete(1);
    console.log(list.getPending());
    console.log(list.getStats());
    list.remove(2);
    console.log(list.getStats());
}

// Question 5 — Async/Await (Medium)
// Write an async function getUserPosts(userId) that:

// Fetches user from https://jsonplaceholder.typicode.com/users/${userId}
// Fetches their posts from https://jsonplaceholder.typicode.com/posts?userId=${userId}
// Both fetches happen at the SAME TIME (hint: Promise.all)
// Returns object: { userName, postCount, posts: [first 3 titles] }
// Has proper try/catch error handling
// Logs result to console

{
    async function getUserPost(userId) {
        try {
            if (typeof userId !== "number" || userId < 1 || userId > 10) {
                throw new Error('userId must be a number between 1 and 10');
            }

            const [userRes, postRes] = await Promise.all([
                fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
                fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            ]);

            if (!userRes.ok) throw new Error(`Failed to fetch user (status: ${userRes.status})`);
            if (!postRes.ok) throw new Error(`Failed to fetch post (status: ${postRes.status})`);

            const user = await userRes.json();
            const posts = await postRes.json();

            const result = {
                userName: user.name,
                postCount: posts.length,
                posts: posts.slice(0, 3).map(post => post.title)
            };

            console.log("Result", result);
            return result;
        } catch (error) {
            console.log("Error", error.message);
        };
    }
    getUserPost(1);
}

// Question 6 — JSON (Medium)
// Given this JSON string:
// jsconst jsonData = `{
//     "company": "TechCorp",
//     "employees": [
//         {"name": "Anas", "role": "Developer", "salary": 50000},
//         {"name": "Sara", "role": "Designer", "salary": 45000},
//         {"name": "Ahmed", "role": "Developer", "salary": 55000},
//         {"name": "Ali", "role": "Manager", "salary": 70000}
//     ]
// }`;
// Write code to:

// Parse the JSON
// Get all developers only
// Calculate average salary of developers
// Add a new employee and convert back to JSON string
// Handle potential JSON parse errors with try/catch

{
    const jsonData = `{
        "company": "TechCorp",
        "employees": [
            {"name": "Anas", "role": "Developer", "salary": 50000},
            {"name": "Sara", "role": "Designer", "salary": 45000},
            {"name": "Ahmed", "role": "Developer", "salary": 55000},
            {"name": "Ali", "role": "Manager", "salary": 70000}
        ]
    }`;

    function processEmployeesData(jsonSring) {
        try {
            const data = JSON.parse(jsonData);
            console.log("Parsed Data", data);

            const developers = data.employees.filter(emp => emp.role === "Developer");
            console.log("Developers", developers);

            const totalSalary = developers.reduce((sum, emp) => sum + emp.salary, 0);
            const averageSalary = totalSalary / developers.length;
            console.log(`Average Developer Salary, ${averageSalary.toFixed(2)}`);

            const newEmployee = {
                name: "Fatima",
                role: "Developer",
                salary: 60000
            }
            data.employees.push(newEmployee);

            const updatedJson = JSON.stringify(data, null, 2);
            console.log("Updated Json", updatedJson);

            return {
                developers,
                averageSalary,
                updatedJson,
                totalEmployees: data.employees.length
            };
        } catch (error) {
            console.log("Json Parse error", error.message);
            return null;
        }
    }
    const result = processEmployeesData(jsonData);
}

// Question 7 — Closures & HOF (Medium)
// Write these functions:

// makeCounter(start) — returns a function that increments and returns count each time called, starting from start
// makeMultiplier(factor) — returns a function that multiplies any number by factor
// Use makeMultiplier to create double and triple functions

{
    function makeCounter(start) {
        let count = start - 1;
        return function() {
            count++;
            return count;
        };
    }

    function makeMultiplier(factor) {
        return function(number) {
            return number * factor;
        };
    }

    const counter = makeCounter(5);
    console.log(counter());
    console.log(counter());
    console.log(counter());

    const double = makeMultiplier(2);
    const triple = makeMultiplier(3);
    console.log(double(5));
    console.log(triple(5));
}