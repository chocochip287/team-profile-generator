// Link to the intern file/object
const Intern = require("../lib/intern");

// Tests

// Object creation

test("Successfully builds an intern object", () => {
    // New intern object
    const newIntern = new Intern("Batman", 1, "bats@cave.com", "University of Gotham");

    // Testing the new intern
    expect(newIntern.name).toBe("Batman");
    expect(newIntern.id).toBe(1);
    expect(newIntern.email).toBe("bats@cave.com");
    expect(newIntern.school).toBe("University of Gotham");
})