// imports Employee parent class

const Employee = require("./employee")

// engineer class

class Intern extends Employee {
    constructor(name, id, email, school) {
        // imported from Employee class
        super(name, id, email);

        this.school = school
    }

    getSchool() {
        return this.school;
        }

    getRole() {
        return "Intern";
    }
}

// export

module.exports = Intern;