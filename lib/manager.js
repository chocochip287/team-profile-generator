// imports Employee parent class

const Employee = require("./employee")

// manager class

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        // imported from Employee class
        super(name, id, email);

        this.officeNumber = officeNumber
    }

    getRole() {
        return "Manager";
    }
}

// export

module.exports = Manager;