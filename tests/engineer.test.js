// Link to the engineer file/object
const Engineer = require("../lib/engineer");

// Tests

// Object creation

test("Successfully builds an engineer object", () => {
    // New engineer object
    const newEngineer = new Engineer("Batman", 1, "bats@cave.com", "DefinitelyNotBruceWayne");

    // Testing the new engineer
    expect(newEngineer.name).toBe("Batman");
    expect(newEngineer.id).toBe(1);
    expect(newEngineer.email).toBe("bats@cave.com");
    expect(newEngineer.github).toBe("DefinitelyNotBruceWayne");
})