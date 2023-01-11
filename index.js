/*
1/11/23
To Do
----
* finish class creation
* create tests for all classes
* build out memberPrompt to create engineer and intern employees.
* build generator - probably a good idea to set up a sample index.html and classes first to know the layout

*/

// node stuff
const fs = require("fs");
const inquirer = require("inquirer");

// class links

const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");

// generator file

// uncomment this when you're actually ready to use it - it's erroring right now due to not being defined.
// const generator = require("./src/generator")

// global variable(s)

// array to hold team members for page generation

let theTeam = [];

// app load function that calls the manager inquirer prompt

function init() {
    // app initiation greeting
    console.log("Hi there!\n\nWelcome to the Team Page Generator.\n\nPlease answer the following questions to generate a page for your team.\n---------\n")
    
    // calls the managerPrompt function after a short delay.
    setTimeout(managerPrompt, 2000);
}

// inquirer prompts

// manager/leader creation prompt

function managerPrompt() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the team leader?",
            // validation to ensure that a name is provided
            validate: nameGiven => {
                if (nameGiven) {
                    return true;
                } else {
                    console.log("\nPlease provide a name for this team leader to proceed.")
                    return false;
                }
            } 
        },
        {
            type: "input",
            name: "id",
            message: "What is the team leader's ID number?",
            // validation that ensures the provided ID is a numeric value
            validate: idGiven => {
                if (!isNaN(idGiven)) {
                    return true;
                } else { 
                    console.log("\nID must be a numeric value.")
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "email",
            message: "What is the team leader's email address?",
            // validation to ensure that an email address is provided
            validate: emailGiven => {
                if (emailGiven) {
                    return true;
                } else {
                    console.log("\nPlease provide an email for this team leader to proceed.")
                }
            }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the team leader's office number?",
            // validation to ensure that officeNumber is a number
            validate: givenOfficeNumber => {
                if (!isNaN(givenOfficeNumber)) {
                    return true;
                } else {
                    console.log("\nOffice number must be a numeric value.");
                    return false;
                }
            }
        }
    ])
    .then((managerData) => {
        // variable to create a Manager object using the newly acquired inputs
        const manager = new Manager(managerData.name, managerData.id, managerData.email, managerData.officeNumber);

        // pushes the newly created manager to the team array
        theTeam.push(manager);

        // confirmation message
        console.log(`\n${managerData.name} was added to the team!\n---------`)

        // check to see if additional leaders need to be added
        inquirer.prompt([
            {
                type: "confirm",
                name: "addLeaders",
                message: "Does this team have any additional leaders?",
            }
        ])
        .then((moreLeaders) => {
            if(moreLeaders.addLeaders) {
                managerPrompt();
            } else {
                // call to non-leader team member creation function
                memberPrompt();
            };
        })
    })
}

// engineer/intern creation prompt

function memberPrompt() {
    console.log("We're gonna create some team members soon!");
}

// app load initialization function call
init();