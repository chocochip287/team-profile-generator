/*
1/13/23
To Do
----
* create tests for all classes
* build generator - probably a good idea to set up a sample index.html and classes first to know the layout

Future Scoping:

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

// uncomment this when you're actually ready to use it - it's erroring right now due to not being defined yet.
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
            // team leader name input
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
            // team leader ID input
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
            // team leader email input
            type: "input",
            name: "email",
            message: "What is the team leader's email address?",
            // validation to ensure that an email address is provided
            validate: emailGiven => {
                if (emailGiven) {
                    return true;
                } else {
                    console.log("\nPlease provide an email for this team leader to proceed.")
                    return false;
                }
            }
        },
        {
            // team leader office number input
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
        // calls managerPrompt again to create more leader entries, otherwise moves the app on to team member creation
        .then((moreLeaders) => {
            if(moreLeaders.addLeaders) {
                managerPrompt();
            } else {
                // call to non-leader team member creation function
                console.log("\nGot it. Moving on to team member creation..\n---------")
                memberPrompt();
            };
        })
    })
}

// engineer/intern creation prompt

function memberPrompt() {
    // console.log("We're gonna create some team members soon!");
    
    inquirer.prompt([
        {
            // determines team member role 
            type: "list",
            name: "role",
            message: "What is this team member's role?",
            choices: ["Engineer", "Intern"]
        },
        {
            // sets the team member's name
            type: "input",
            name: "name",
            message: "What is this team member's name?",
            // validation to ensure that a name is provided
            validate: nameGiven => {
                if (nameGiven) {
                    return true;
                } else {
                    console.log("\nPlease provide a name for this team member to proceed.")
                    return false;
                }
            } 
        },
        {
            // sets the team member's ID number
            type: "input",
            name: "id",
            message: "What is this team member's ID number?",
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
            // sets the team member's email address
            type: "input",
            name: "email",
            message: "What is this team member's email address?",
            // validation to ensure that an email address is provided
            validate: emailGiven => {
                if (emailGiven) {
                    return true;
                } else {
                    console.log("\nPlease provide an email for this team member to proceed.")
                    return false;
                }
            }
        },
        {
            // sets the team member's github account if engineer was selected as role
            type: "input",
            name: "github",
            message: "What is this engineer's GitHub username?",
            when: (memberData) => memberData.role === "Engineer",
            validate: githubGiven => {
                if (githubGiven) {
                    return true;
                } else {
                    console.log("\nPlease provide a GitHub username for this engineer to proceed.")
                    return false;
                }
            }
        },
        {
            // sets the team member's school if intern was selected as role
            type: "input",
            name: "school",
            message: "What school does this intern attend?",
            when: (memberData) => memberData.role === "Intern",
            validate: schoolGiven => {
                if (schoolGiven) {
                    return true;
                } else {
                    console.log("\nPlease provide this intern's school to proceed.")
                    return false;
                }
            }
        }
    ])
    .then((memberData) => {

        // pushes team members into the team array after creating role based objects
        if (memberData.role === "Engineer") {
            // engineer variable to hold the new engineer's data
            const engineer = new Engineer(memberData.name, memberData.id, memberData.email, memberData.github);

            // pushes the newly created engineer to the team array
            theTeam.push(engineer);
        } else {
            // intern variable to hold the new intern's data
            const intern = new Intern(memberData.name, memberData.id, memberData.email, memberData.school)

            // pushes the newly created intern to the team array
            theTeam.push(intern);
        }

        // confirmation message
        console.log(`\n${memberData.name} was added to the team!\n---------`)

        // check to see if additional members need to be added
        inquirer.prompt([
            {
                type: "confirm",
                name: "addMembers",
                message: "Does this team have any additional members?",
            }
        ])
        // calls memberPrompt again to create more member entries, otherwise moves the app on to generate the team page
        .then((moreMembers) => {
            if(moreMembers.addMembers) {
                memberPrompt();
            } else {
                console.log("\nGot it. Your team is complete!\nMoving on to building your team page..\n---------");
                // call to page generator using team data
            };
        })
    })
}

// app load initialization function call
init();