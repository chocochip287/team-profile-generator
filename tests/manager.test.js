// Link to the manager file/object
const Manager = require("../lib/manager");

// Tests

// Object creation

test("Successfully builds a manager object", () => {
    // New manager object
    const newManager = new Manager("Batman", 1, "bats@cave.com", 123);

    // Testing the new manager
    expect(newManager.name).toBe("Batman");
    expect(newManager.id).toBe(1);
    expect(newManager.email).toBe("bats@cave.com");
    expect(newManager.officeNumber).toBe(123);
})