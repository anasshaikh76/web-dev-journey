// 💻 15 PRACTICE PROBLEMS

// Problem 1 — Synchronous vs Asynchronous

{
    console.log("1. First");
    console.log("2. Second");
    console.log("3. Third");
    // Runs top to bottom, one line at a time
    // This is SYNCHRONOUS - normal JS behavior
}
// Note: Normal code runs in order, one line waits for the previous to finish.

// Problem 2 — setTimeout (Async example)

{
    console.log("1. First");

    setTimeout(() => {
        console.log("2. This runs after 2 seconds");
    }, 2000);

    console.log("3. This runs immediately!");
    // Output order: 1, 3, 2 (not in order written!)
}
// What's happening: setTimeout doesn't pause the code — JS continues running other lines while waiting!

// Problem 3 — Callback Function (Review)

{
    function fetchData(callback) {
        console.log("Fetching Data...");
        setTimeout(() => {
            callback("Data Recieved!");
        }, 1000);
    }

    fetchData(function(result) {
        console.log(result);
    });
    console.log("This runs before data arrives");
}
// What's happening: Callback runs later, once the operation finishes — basic pattern for async work.

// Problem 4 — Callback Hell (The Problem)

{
    function step1(callback) {
        setTimeout(() => {
            console.log("Step 1 done");
            callback();
        }, 1000);
    }
    function step2(callback) {
        setTimeout(() => {
            console.log("Step 2 done");
            callback();
        }, 1000);
    }
    function step3(callback) {
        setTimeout(() => {
            console.log("Step 3 done");
            callback();
        }, 1000);
    }

    // This nesting gets messy fast!
    step1(() => {
        step2(() => {
            step3(() => {
                console.log("All steps complete!");
            });
        });
    });
}
// Note: This pyramid shape is called "Callback Hell" — hard to read with many steps. Promises fix this!

// Problem 5 — Creating a Promise

{
    const myPromise = new Promise((resolve, reject) => {
        let success = true;

        if (success) {
            resolve("Operation successful!");
        } else {
            reject("Operation failed!");
        }
    });

    console.log(myPromise); // Promise object
}
// What's happening: A Promise is a placeholder for a future value — it either resolves (success) or rejects (failure).

// Problem 6 — Using .then() and .catch()

{
    let myPromise = new Promise((resolve, reject) => {
        let success = false;
        if (success) {
            resolve("Data Loaded!");
        }else {
            reject("Error in Loading Data!");
        }
    })

    myPromise.then((result)=> {
        console.log("Success:", result);
    }).catch((error) => {
        console.log("Error:", error);
    })
}
// Note: .then() runs if resolved, .catch() runs if rejected. Much cleaner than nested callbacks!

// Problem 7 — Promise with setTimeout

{
    function fetchUser() {
        return new Promise((resolve, reject) => {
            console.log("Fetching User...");
            setTimeout(() => {
                resolve({ name: "Anas", age: 20});
            }, 1500);
        });
    }

    fetchUser().then((user) => {
        console.log("User Fetched:", user.name, user.age);
    })
}

// Problem 8 — Chaining Promises

{
    function step1() {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("Step 1 Done");
                resolve(10);
            }, 500)
        });
    }

    function step2(value) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("Step 2 Done, value:", value);
                resolve(value * 2);
            }, 500)
        });
    }

    step1()
        .then((result) => step2(result))
        .then((finalResult) => {
            console.log("Final Result:", finalResult);
        })
}
// Note: This replaces Callback Hell from Problem 4 — flat and readable instead of nested pyramid!

// Problem 9 — Promise.all (Multiple promises together)

{
    const promise1 = new Promise((resolve) => 
    setTimeout(() => resolve("First"), 1000)
    );
    const promise2 = new Promise((resolve) => 
    setTimeout(() => resolve("Second"), 1500)
    );
    const promise3 = new Promise((resolve) => 
    setTimeout(() => resolve("Third"), 500)
    );

    Promise.all([promise1, promise2, promise3]).then((result) => {
        console.log("All Done:", result);
    })
}
// Note: Promise.all waits for ALL promises to finish, then gives results in order — great for loading multiple things at once!

// Problem 10 — Simulating an API call

{
    function getUserData(userId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (userId > 0) {
                    resolve({ id: userId, name: "Anas Shaikh"});
                } else {
                    reject("Invalid user ID!");
                }
            }, 1000);
        });
    }

    getUserData(1)
        .then((user) => {
            console.log("User Found:", user.name);
        })
        .catch((error) => {
            console.log("Error:", error);
        });
    getUserData(-1)
        .then((user) => {
            console.log("User Found:", user.name);
        })
        .catch((error) => {
            console.log("Error:", error);
        });

}

// Problem 11 — async/await (Modern way!)

{
    function fetchData() {
        return new Promise((resolve) => {
            setTimeout(() => resolve("Data arrived!"), 1000);
        });
    }

    async function getData() {
        console.log("Fetching...");
        let result = await fetchData(); // waits here!
        console.log(result);
        console.log("This runs AFTER data arrives!");
    }

    getData();
}
// Note: async/await makes asynchronous code LOOK synchronous — await pauses until promise resolves. Much easier to read than .then()!

// Problem 12 — async/await with try/catch

{
    function fetchUser(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (id > 0) {
                    resolve({ id: id, name: "Anas"})
                } else {
                    reject("Invalid ID!");
                }
            }, 1000);
        });
    }

    async function getUser(id) {
        try {
            let user = await fetchUser(id);
            console.log("Success:", user.name);
        } catch (error) {
            console.log("Caught Error:", error);
        }
    }

    getUser(1);
    getUser(-1);
}
// Note: try/catch with async/await replaces .then()/.catch() — this is the most modern way to handle async code!

// Problem 13 — Multiple awaits in sequence

{
    function delay(value, ms) {
        return new Promise((resolve) => 
            setTimeout(() => resolve(value), ms)
        )
    }   

    async function process() {
        console.log("Stating...");
        let step1 = await delay("Step 1 completed", 500);
        console.log(step1);

        let step2 = await delay("Step 2 completed", 500);
        console.log(step2);

        let step3 = await delay("Step 3 completed", 500);
        console.log(step3);

        console.log("All Steps finished!");
    }

    process();
}
// Note: Each await waits for the previous to finish — clean, readable, no nesting at all!

// Problem 14 — async/await with Promise.all

{
    function delay(value, ms) {
        return new Promise((resolve) => 
            setTimeout(() => resolve(value), ms)
        );
    }

    async function loadAll() {
        console.log("Loading Everything...");
        let results = await Promise.all([
            delay("Users Loaded", 1000),
            delay("Posts Loading", 800),
            delay("Comments Loaded", 600)
        ]);
        console.log(results);
        console.log("Everything Loaded!");
    }
    
    loadAll();
}
// Note: Combine await with Promise.all to load multiple things in parallel, then continue once ALL are done!

// Problem 15 — Mini Project: Simulated Login System

{
    const users = [
        { username: "anas", password: "1234" },
        { username: "ahmed", password: "5678" }
    ];

    function checkLogin(username, password) {
        return new Promise((resolve, reject) => {
            console.log("Checking Credentials...");
            setTimeout(() => {
                let user = users.find(u => u.username === username);

                if (!user) {
                    reject("User not found!");
                } else if (user.password !== password) {
                    reject("Invalid Password!");
                } else {
                    resolve(`Welcome back, ${username}`);
                }
            }, 1000);
        });
    }

    async function login(username, password) {
        try {
            let message = await checkLogin(username, password);
            console.log("✅", message)
        } catch (error) {
            console.log("❌", error);
        }
    }

    login("anas", "1234");
    login("anas", 1234);
    login("unknown", "1234");
}