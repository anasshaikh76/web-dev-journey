// Problem 1 — Basic Class

{
    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
    }

    const person1 = new Person("anas", 20);
    console.log(person1.name);
    console.log(person1.age);
    console.log(person1);
}
// What's happening: class is a blueprint. constructor runs automatically when you create a new object with new. this refers to the object being created!

// Problem 2 — Class with Methods

{
    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }

        greet() {
            return `Hi i am ${this.name} and i am ${this.age} years old!`
        }

        haveBirthday() {
            this.age++;
            return `${this.name} is now ${this.age} years old~`
        }
    }

    const person1 = new Person("anas", 20);
    console.log(person1.greet());
    console.log(person1.haveBirthday());
}
// Note: Methods are functions INSIDE a class — every object made from this class gets these methods automatically!

// Problem 3 — Multiple Instances

{
    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }

        greet() {
            return `hi i am ${this.name}`;
        }
    }

    const person1 = new Person("anas", 20);
    const person2 = new Person("ahmed", 22);
    const person3 = new Person("sara", 19);

    console.log(person1.greet());
    console.log(person2.greet());
    console.log(person3.greet());

    person1.age = 21;

    console.log(person1.age); // 21
    console.log(person2.age); // 22 (unaffected!)
}
// Note: Each object created from the class is independent — changing one doesn't affect others!

// Problem 4 — Class with Default Values

{
    class Product {
        constructor(name, price, inStock = true) {
            this.name = name;
            this.price = price;
            this.inStock = inStock;
        }

        getInfo() {
            return `${this.name}: ${this.price} - ${this.inStock ? "Available" : "Out Of Stock"}`;
        }
    }

    const product1 = new Product("laptop", 50000);
    const product2 = new Product("mobile", 20000, false);

    console.log(product1.getInfo());
    console.log(product2.getInfo());
}

// Problem 5 — Class with Array Property

{
    class shoppingCart {
        constructor() {
            this.items = [];
        }
        addItem(item) {
            this.items.push(item);
            console.log(`Added Item: ${item}`);
        }
        removeItem(item) {
            this.items = this.items.filter(i => i !== item);
            console.log(`Removed Item: ${item}`);
        }

        showCart() {
            console.log("Cart:", this.items);
        }
    }

    const card = new shoppingCart();
    card.addItem("laptop");
    card.addItem("Mouse");
    card.addItem("Keyboard");
    card.removeItem("Mouse");
    card.showCart();
}
// Note: This is way cleaner than separate functions managing a separate array — everything related lives together!

// Problem 6 — Getters and Setters

{
    class Circle {
        constructor(radius) {
            this.radius = radius;
        }

        get area() {
            return (Math.PI * this.radius ** 2).toFixed(2);
        }

        get circumference() {
            return (2 * Math.PI * this.radius).toFixed(2);
        }
    }

    const circle1 = new Circle(5);
    console.log(circle1.area);
    console.log(circle1.circumference);
}
// Note: Notice we write circle1.area not circle1.area() — getters look like properties but run code behind the scenes!

// Problem 7 — Static Methods

{
    class MathHelper {
        static square(n) {
            return n * n;
        }
        static cube(n) {
            return n * n * n;
        }
    }

    // Called on the CLASS directly, not on an instance!
    console.log(MathHelper.square(5)); // 25
    console.log(MathHelper.cube(3));   // 27

    // const helper = new MathHelper();
    // helper.square(5); // ❌ This would NOT work!
}
// Note: static methods belong to the class itself, not to individual objects — used for utility/helper functions!

// Problem 8 — Inheritance with extends

{
    class Animals {
        constructor(name) {
            this.name = name;
        }
        speaks() {
            return `${this.name} makes a sound`;
        }
    }

    class Dog extends Animals {
        speaks() {
            return `${this.name} barks! 🐕`
        }
    }
    class Cat extends Animals {
        speaks() {
            return `${this.name} meow! 🐈`
        }
    }
    class Dragon extends Animals {
        speaks() {
            return `${this.name} ROARR!`
        }
    }

    const dog1 = new Dog("Rex");
    const cat1 = new Cat("Suzy");
    const drg = new Dragon("T-rex");
    const animal1 = new Animals("Generic animal");

    console.log(dog1.speaks());
    console.log(cat1.speaks());
    console.log(drg.speaks());
    console.log(animal1.speaks());
}
// Note: extends means Dog and Cat INHERIT everything from Animal, then can override methods with their own version. This is called polymorphism!

// Problem 9 — super() keyword

{
    class Animal {
        constructor(name, sound) {
            this.name = name;
            this.sound = sound;
        }
        speaks() {
            return `${this.name} says ${this.sound}`;
        }
    }
    class Dog extends Animal {
        constructor(name, breed) {
            super(name, "Woof");
            this.breed = breed;
        }
        getInfo() {
            return `${this.name} is a ${this.breed}`;
        }
    }
    const dog1 = new Dog("Rex", "labrador");
    console.log(dog1.speaks());
    console.log(dog1.getInfo());
}
// Note: super(...) calls the parent class's constructor — must be called FIRST before using this in a child class!

// Problem 10 — Private Fields (Modern JS)

{
    class BankAccount {
        #balance = 0;

        constructor(owner, initialBalance) {
            this.owner = owner;
            this.#balance = initialBalance;
        }

        deposit(amount) {
            this.#balance += amount;
            return `Deposited ₹${amount}. New balance: ₹${this.#balance}`;
        }

        withdar(amount) {
            if (amount > this.#balance) {
                return "❌ Insufficient funds!";
            }
            this.#balance -= amount;
            return `Withdrew ₹${amount}. New balance: ₹${this.#balance}`;
        }

        getBalance() {
            return `₹${this.#balance}`;
        }
    }

    const account = new BankAccount("Anas", 1000);
    console.log(account.deposit(500));
    console.log(account.withdar(200));
    console.log(account.getBalance());
}
// Note: #balance can ONLY be accessed inside the class — protects sensitive data from being changed directly from outside!

// Problem 11 — Class with Validation

{
    class User {
        constructor(username, email, age) {
            if (age < 18) {
                throw new Error("User must be 13 or older!");
            }
            this.username = username;
            this.email = email;
            this.age = age;
        }

        isAdult() {
            return this.age >= 18;
        }
    }

    try {
        const user1 = new User("anas123", "anas123@.gmail.com", 20);
        console.log(user1.username, "-Adult:", user1.isAdult());

        const user2 = new User("kid123", "kid@email.com", 10);
    } catch (error) {
        console.log("Error Creating User:", error.message);
    }
}
// Note: You can validate data right in the constructor and throw errors to prevent invalid objects from being created!

// Problem 12 — Array of Class Instances

{
    class Student {
        constructor(name, grade) {
            this.name = name;
            this.grade = grade;
        }
        getStatus() {
            return this.grade >= 60 ? "Pass" : "Fail";
        }
    }

    const students = [
        new Student("Anas", 92),
        new Student("Ahmed", 55),
        new Student("Sara", 78),
        new Student("Ali", 40)
    ];

    students.forEach(s => {
        console.log(`${s.name}: ${s.grade} - ${s.getStatus()}`);
    });

    const passed = students.filter(s => s.getStatus() === "Pass");
    console.log("Passed:", passed.map(s => s.name));
}
// Note: Array methods work perfectly with class instances — this is exactly how you'd manage data in a real app!

// Problem 13 — toString() Method

{
    class Product {
        constructor(name, price) {
            this.name = name;
            this.price = price;
        }

        // Special method - runs automatically when converting to string
        toString() {
            return `${this.name} (₹${this.price})`;
        }
    }

    const item = new Product("Laptop", 50000);
    console.log(item.toString());     // Laptop (₹50000)
    console.log(`Item: ${item}`);     // Item: Laptop (₹50000) - auto called!
    console.log("Item: " + item);     // Item: Laptop (₹50000) - auto called!
}
// Note: When you use an object in a template literal or string concatenation, toString() runs automatically!

// Problem 14 — Class Composition (Class inside Class)

{
    class Engine {
        constructor(horsepower) {
            this.horsepower = horsepower;
        }
        start() {
            return `Engine started with ${this.horsepower}HP`;
        }
    }

    class Car {
        constructor(brand, model, horsepower) {
            this.brand = brand;
            this.model = model;
            this.engine = new Engine(horsepower);
        }
        drive() {
            return `${this.brand} ${this.model}: ${this.engine.start()}`;
        }
    }

    const car1 = new Car("Toyota", "Supra", 382);
    console.log(car1.drive());
}
// Note: Classes can contain other class instances — this is called composition, building complex objects from simpler ones!

// Problem 15 — Mini Project: Library Management System

{
    class Book {
        constructor(title, author, isbn) {
            this.title = title;
            this.author = author;
            this.isbn = isbn;
            this.isCheckedOut = false;
        }
    }

    class Library {
        constructor() {
            this.books = [];
        }

        addBook(title, author, isbn) {
            const book = new Book(title, author, isbn);
            this.books.push(book);
            console.log(`✅ Added: "${title}" by ${author}`);
        }

        checkOut(isbn) {
            const book = this.books.find(b => b.isbn === isbn);
            if (!book) {
                console.log("❌ Book not found!");
                return;
            }
            if (book.isCheckedOut) {
                console.log(`❌ "${book.title}" is already checked out!`);
                return;
            }
            book.isCheckedOut = true;
            console.log(`📖 Checked out: "${book.title}"`);
        }

        returnBook(isbn) {
            const book = this.books.find(b => b.isbn === isbn);
            if (book) {
                book.isCheckedOut = false;
                console.log(`✅ Returned: "${book.title}"`);
            }
        }

        showAvailable() {
            const available = this.books.filter(b => !b.isCheckedOut);
            console.log("\n📚 Available Books:");
            available.forEach(b => console.log(`- ${b.title} by ${b.author}`));
        }

        showCheckedOut() {
            const checkedOut = this.books.filter(b => b.isCheckedOut);
            console.log("\n📕 Checked Out Books:");
            checkedOut.forEach(b => console.log(`- ${b.title} by ${b.author}`));
        }
    }

    const library = new Library();

    library.addBook("Atomic Habits", "James Clear", "001");
    library.addBook("Clean Code", "Robert Martin", "002");
    library.addBook("Eloquent JS", "Marijn Haverbeke", "003");
    library.addBook("Beast Tamer", "Blue Leaf Scholar", "004");

    library.checkOut("001");
    library.checkOut("002");

    library.showAvailable();
    library.showCheckedOut();

    library.returnBook("001");
    console.log("\n--- After returning Atomic Habits ---");
    library.showAvailable();
}