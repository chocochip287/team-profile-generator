// imports Employee parent class

const Employee = require("./employee")

// engineer class

class Engineer extends Employee {
    constructor(name, id, email, github) {
        // imported from Employee class
        super(name, id, email);

        this.github = github
    }

    getGithub() {
        return this.github;
        }

    getRole() {
        return "Engineer";
    }
}

// export

module.exports = Engineer;