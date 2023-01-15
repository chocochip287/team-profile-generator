/*
1/14/23
To Do
----
* Create tests for all classes
* Record demo

Future Scoping
----
* Make the stylization much, much prettier. It's been a long time since I've worked on a front end all the way through and since there's so much new-to-me tech here I didn't wanna spend too much effort/brain power on prettying up the MVP versus establishing base functionality.
* Refine the inquirer validation - make it more specific for individual questions versus simple "was a value provided" sort of pass/fails, e.g. specific character validation for emails, not letting ID values be the same for multiple team members, etc.

*/

// Inquirer link
const inquirer = require("inquirer");

// Class links

const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");

// Generator file

const {arrayEater} = require("./src/generator")

// Global variable(s)

// Array to hold team members for page generation

let theTeam = [];

// App load function that calls the manager inquirer prompt to begin the process

function init() {
    // App initiation greeting
    console.log("Hi there!\n\nWelcome to the Team Page Generator.\n\nPlease answer the following questions to generate a page for your team.\n---------\n\n")
    
    // Calls the managerPrompt function after a short delay.
    setTimeout(managerPrompt, 1500);
}

// Inquirer prompts

// Manager/leader creation prompt

function managerPrompt() {
    inquirer.prompt([
        {
            // Team leader name input
            type: "input",
            name: "name",
            message: "What is the name of the team leader?",
            // Validation to ensure that a name is provided
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
            // Team leader ID input
            type: "input",
            name: "id",
            message: "What is the team leader's ID number?",
            // Validation that ensures the provided ID is a numeric value
            validate: idGiven => {
                if (!isNaN(idGiven) && idGiven) {
                    return true;
                } else { 
                    console.log("\nID must be a numeric value.")
                    return false;
                }
            }
        },
        {
            // Team leader email input
            type: "input",
            name: "email",
            message: "What is the team leader's email address?",
            // Validation to ensure that an email address is provided
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
            // Team leader office number input
            type: "input",
            name: "officeNumber",
            message: "What is the team leader's office number?",
            // Validation to ensure that officeNumber is a number
            validate: givenOfficeNumber => {
                if (!isNaN(givenOfficeNumber) && givenOfficeNumber) {
                    return true;
                } else {
                    console.log("\nOffice number must be a numeric value.");
                    return false;
                }
            }
        }
    ])
    .then((managerData) => {
        // Variable to create a Manager object using the newly acquired inputs
        const manager = new Manager(managerData.name, managerData.id, managerData.email, managerData.officeNumber);

        // Pushes the newly created manager to the team array
        theTeam.push(manager);

        // Confirmation message
        console.log(`\n${managerData.name} was added to the team!\n---------`)

        // Check to see if additional leaders need to be added
        inquirer.prompt([
            {
                type: "confirm",
                name: "addLeaders",
                message: "Does this team have any additional leaders?",
            }
        ])
        // Calls managerPrompt again to create more leader entries, otherwise moves the app on to team member creation
        .then((moreLeaders) => {
            if(moreLeaders.addLeaders) {
                managerPrompt();
            } else {
                // Call to non-leader team member creation function
                console.log("\nGot it. Moving on to team member creation..\n---------")
                memberPrompt();
            };
        })
    })
}

// Engineer/intern creation prompt

function memberPrompt() {
    inquirer.prompt([
        {
            // Determines team member role 
            type: "list",
            name: "role",
            message: "What is this team member's role?",
            choices: ["Engineer", "Intern"]
        },
        {
            // Sets the team member's name
            type: "input",
            name: "name",
            message: "What is this team member's name?",
            // Validation to ensure that a name is provided
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
            // Sets the team member's ID number
            type: "input",
            name: "id",
            message: "What is this team member's ID number?",
            // Validation that ensures the provided ID is a numeric value
            validate: idGiven => {
                if (!isNaN(idGiven) && idGiven) {
                    return true;
                } else { 
                    console.log("\nID must be a numeric value.")
                    return false;
                }
            }
        },
        {
            // Sets the team member's email address
            type: "input",
            name: "email",
            message: "What is this team member's email address?",
            // Validation to ensure that an email address is provided
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
            // Sets the team member's github account if engineer was selected as role
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
            // Sets the team member's school if intern was selected as role
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

        // Pushes team members into the team array after creating role based objects
        if (memberData.role === "Engineer") {
            // Engineer variable to hold the new engineer's data
            const engineer = new Engineer(memberData.name, memberData.id, memberData.email, memberData.github);

            // Pushes the newly created engineer to the team array
            theTeam.push(engineer);
        } else {
            // intern variable to hold the new intern's data
            const intern = new Intern(memberData.name, memberData.id, memberData.email, memberData.school)

            // pushes the newly created intern to the team array
            theTeam.push(intern);
        }

        // Confirmation message
        console.log(`\n${memberData.name} was added to the team!\n---------`)

        // Check to see if additional members need to be added
        inquirer.prompt([
            {
                type: "confirm",
                name: "addMembers",
                message: "Does this team have any additional members?",
            }
        ])
        // Calls memberPrompt again to create more member entries, otherwise moves the app on to generate the team page
        .then((moreMembers) => {
            if(moreMembers.addMembers) {
                memberPrompt();
            } else {
                console.log("\nGot it. Your team is complete!\nMoving on to building your team page..\n---------");
                // call to page generator using team data
                arrayEater(theTeam);
            };
        })
    })
}

// app load initialization function call
init();