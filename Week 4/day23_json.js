// Problem 1 — What is JSON?

{
    // JSON = JavaScript Object Notation
    // It's just TEXT that looks like an object/array
    // Used to send/receive data between servers and apps

    const jsonString = '{"name": "Anas", "age" : 20}'
    console.log(typeof jsonString);
    console.log(jsonString);
}
// Note: JSON is always plain text — even though it looks like JS objects, quotes around keys are required!

// Problem 2 — JSON.parse (String → Object)

{
    const jsonString = '{"name": "Anas", "age" : 20, "city" : "Hyderabad"}'

    const person = JSON.parse(jsonString);
    console.log(person);
    console.log(typeof person);
    console.log(person.name);
    console.log(person.age);
}
// What's happening: JSON.parse converts JSON text into a real JavaScript object you can use normally!

// Problem 3 — JSON.stringify (Object → String)

{
    const person = {
        name: "Anas",
        age: 20,
        city : "Hyderabad",
        isStudent : true
    }

    const jsonString = JSON.stringify(person);
    console.log(jsonString);
    console.log(typeof jsonString);
}
// What's happening: Opposite of parse — converts a JS object into JSON text. This is what you use before saving to localStorage!

// Problem 4 — JSON with Arrays

{
    const jsonArray = '[1, 2, 3, 4, 5]';
    const numbers = JSON.parse(jsonArray);
    console.log(numbers);
    console.log(Array.isArray(numbers));

    const colors = ["red", "green", "blue"];
    const colorJSON = JSON.stringify(colors);
    console.log(colorJSON);
}

// Problem 5 — Nested JSON Objects

{
    const jsonString = `{
        "name": "Anas",
        "age" : 20,
        "address" : {
            "city" : "Hyderabad",
            "state" : "Telengana"
        },
        "skills" : ["HTML", "CSS", "JAVASCRIPT"]
    }`;

    const data = JSON.parse(jsonString);
    console.log(data.name);
    console.log(data.address.city);
    console.log(data.skills[0]);
    console.log(data.skills.length);
}
// Note: Nested JSON works exactly like nested JS objects once parsed — access with dot notation!

// Problem 6 — Array of Objects (Very Common!)

{
    const jsonString = `[
        {"name": "Anas", "grade": 92},
        {"name": "Ahmed", "grade": 78},
        {"name": "Sara", "grade": 85}
    ]`;

    const students = JSON.parse(jsonString);
    console.log(students.length);

    students.forEach(student => {
        console.log(`${student.name}: ${student.grade}`);
    });

    const topStudent = students.find(s => s.grade > 90);
    console.log("Top Student:", topStudent.name);
}
// Note: This is exactly the format APIs return data in — array of objects!

// Problem 7 — Pretty Print JSON

{
    const person = {
        name : "Anas",
        age : 20,
        skills : ["HTML", "JAVASCRIPT", "CSS"]
    };

    console.log(JSON.stringify(person));

    console.log(JSON.stringify(person, null, 2));
}
// Note: Adding null, 2 makes JSON readable with proper indentation — great for debugging!

// Problem 8 — Handling Invalid JSON (Error handling)

{
    const badJSON = "{name: Anas}";

    try {
        const data = JSON.parse(badJSON);
        console.log(data);
    } catch (error) {
        console.log("❌ Invalid JSON:", error.message);
    }

    const goodJSON = '{"name" : "Anas"}'

    try {
        const data = JSON.parse(goodJSON);
        console.log("✅ Valid:", data);
    } catch (error) {
        console.log("❌ Invalid JSON:", error.message);
    }
}
// Important: Always wrap JSON.parse in try/catch — invalid JSON crashes your program otherwise!

// Problem 9 — JSON doesn't support functions or undefined

{
    const obj = {
        name : "Anas",
        age : 20,
        greet : function() { return "Hello!"},
        nothing: undefined,
        empty : null
    }

    const jsonString = JSON.stringify(obj);
    console.log(jsonString,);
}
// Note: JSON can only store: strings, numbers, booleans, null, arrays, objects. NOT functions or undefined!

// Problem 10 — Converting Form Data to JSON

{
    const fromData = {
        username : "anas123",
        email : "anas.email@.com",
        age : 20,
        newsletter : true
    }

    const jsonToSend = JSON.stringify(fromData);
    console.log("Sending to server:",jsonToSend);

    const serverResponse = '{"status": "success", "userId": 12345}';
    const response = JSON.parse(serverResponse);
    console.log("Server says:", response.status);
    console.log("New user id:", response.userId);
}

// Problem 11 — Deep Nested JSON

{
    const jsonString = `{
        "company" : "TechCorp",
        "employees" : [
            {
                "name" : "Anas",
                "department" : "Engineering",
                "projects" : ["WebApp", "MobileApp"]
            },
            {
                "name" : "Sara",
                "department" : "Design",
                "projects" : ["Branding"]
            }
        ]
    }`;

    const data = JSON.parse(jsonString);
    console.log(data.company);
    console.log(data.employees[0].name);
    console.log(data.employees[0].projects);
    console.log(data.employees[1].department);

    data.employees.forEach(emp => {
        console.log(`${emp.name} (${emp.department}): ${emp.projects.join(", ")}`);
    })
}

// Problem 12 — Save Complex Data with JSON (localStorage review)

{
    const userData = {
        username : "anas123",
        preferences : {
            theme : "dark",
            lang : "en",
        },
        favoriteColor: ["blue", "red"],
        loginCount : 15
    };

    const saved = JSON.stringify(userData);
    console.log("Saved as:", saved);

    const loaded = JSON.parse(saved);
    console.log("Theme:", loaded.preferences.theme);
    console.log("Login Count:", loaded.loginCount);
    console.log("Favorite Colors:", loaded.favoriteColor);
}
// Note: This is exactly what you did in Day 19 with localStorage — now you understand WHY it works!

// Problem 13 — Filtering and Transforming JSON Data

{
    const jsonData = `[
        {"name": "Phone", "price": 20000, "category": "Electronics"},
        {"name": "Shirt", "price": 800, "category": "Clothing"},
        {"name": "Laptop", "price": 80000, "category": "Electronics"},
        {"name": "Shoes", "price": 2500, "category": "Clothing"}
    ]`;

    const products = JSON.parse(jsonData);

    const electronics = products.filter(p => p.category === "Electronics");
    console.log("Electronics:", electronics.map(p => p.name));

    const total = products.reduce((sum, p) => sum + p.price, 0);
    console.log("Total value: ₹", total);

    const cheapItems = products.filter(p => p.price < 5000);
    console.log(JSON.stringify(cheapItems, null, 2));
}

// Problem 14 — Comparing Objects via JSON

{
    const obj1 = { name: "Anas", age : 20};
    const obj2 = { name: "Anas", age : 20};

    console.log(obj1 === obj2);

    console.log(JSON.stringify(obj1) === JSON.stringify(obj2));
}
// Note: Objects can't be compared directly with === — converting to JSON string is a common trick to check if they have the same data!

// Problem 15 — Mini Project: Student Database Simulator

{
    const databaseJSON = `[
        {"id": 1, "name": "Anas", "grades": [92, 88, 95]},
        {"id": 2, "name": "Ahmed", "grades": [65, 70, 68]},
        {"id": 3, "name": "Sara", "grades": [45, 50, 48]},
        {"id": 4, "name": "Ali", "grades": [85, 90, 88]}
    ]`;

    const students = JSON.parse(databaseJSON);

    const report = students.map( student => {
        const avg = student.grades.reduce((a, b) => a + b, 0) / student.grades.length;
        return {
            id : student.id,
            name : student.name,
            avg : avg.toFixed(1),
            status : avg >= 60 ? "Pass" : "Fail"
        };
    });

    console.log("===== STUDENT REPORT =====");
    report.forEach(s => {
        console.log(`${s.id}. ${s.name}: ${s.avg}% - ${s.status}`);
    });

    const updateDatabase = JSON.stringify(report, null, 2);
    console.log("\n--- Saving Updated DataBase---");
    console.log(updateDatabase);

    const passed = report.filter(s => s.status === "Pass").length;
    console.log(`\n${passed}/${students.length} students passed!`);
}