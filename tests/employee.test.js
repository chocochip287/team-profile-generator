// Link to the Employee object/file
const Employee = require("../lib/employee");

// Tests

// Object creation

test("Successfully builds an employee object", () => {
    // New employee object
    const newEmployee = new Employee("Batman", 1, "bats@cave.com");

    // Testing the new employee
    expect(newEmployee.name).toBe("Batman");
    expect(newEmployee.id).toBe(1);
    expect(newEmployee.email).toBe("bats@cave.com");
})