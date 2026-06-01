// ===== CONTACT BOOK APPLICATION =====
// Uses: Arrays, Objects, Functions, 
//       Loops, Conditionals (Week 1 Complete!)

let contacts = [];

// 1. ADD CONTACT
function addContact(name, phone, email) {
    let exists = contacts.some(c => 
        c.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
        console.log(`❌ "${name}" already exists!`);
        return;
    }

    contacts.push({ name, phone, email });
    console.log(`✅ "${name}" added!`);
}

// 2. DISPLAY ALL
function displayAll() {
    if (contacts.length === 0) {
        console.log("📭 No contacts yet!");
        return;
    }
    console.log("\n===== ALL CONTACTS =====");
    contacts.forEach((c, i) => {
        console.log(`${i + 1}. ${c.name}`);
        console.log(`   📞 ${c.phone}`);
        console.log(`   📧 ${c.email}`);
    });
    console.log("========================\n");
}

// 3. SEARCH
function searchContact(name) {
    let found = contacts.find(c => 
        c.name.toLowerCase() === name.toLowerCase()
    );

    if (found) {
        console.log(`\n✅ Found: ${found.name}`);
        console.log(`   📞 ${found.phone}`);
        console.log(`   📧 ${found.email}\n`);
    } else {
        console.log(`❌ "${name}" not found!`);
    }
}

// 4. EDIT
function editContact(name, newPhone, newEmail) {
    let contact = contacts.find(c => 
        c.name.toLowerCase() === name.toLowerCase()
    );

    if (contact) {
        contact.phone = newPhone;
        contact.email = newEmail;
        console.log(`✅ "${name}" updated!`);
    } else {
        console.log(`❌ "${name}" not found!`);
    }
}

// 5. DELETE
function deleteContact(name) {
    let index = contacts.findIndex(c => 
        c.name.toLowerCase() === name.toLowerCase()
    );

    if (index !== -1) {
        contacts.splice(index, 1);
        console.log(`✅ "${name}" deleted!`);
    } else {
        console.log(`❌ "${name}" not found!`);
    }
}

// ===== TESTING =====
console.log("=== CONTACT BOOK ===\n");

addContact("Anas Shaikh", "9876543210", "anas@email.com");
addContact("Ahmed Khan", "9123456789", "ahmed@email.com");
addContact("Sara Ali", "9988776655", "sara@email.com");
addContact("Anas Shaikh", "1111111111", "fake@email.com"); // duplicate test

displayAll();

searchContact("Ahmed Khan");
searchContact("Unknown Person"); // not found test

editContact("Sara Ali", "9000000000", "sara.new@email.com");
displayAll();

deleteContact("Ahmed Khan");
displayAll();

console.log(`Total contacts: ${contacts.length}`);