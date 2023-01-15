/*
1/13/2023
To do
----
* Nothing for now. MVP achieved.

Future scoping
----
* See index.js. Functionally everything is working as intended but the stylization of the output could use some love.

*/

const fs = require('fs');

// Functions to transform team member elements into HTML blurbs - these should return their outputs to arrayEater. Must remain above arrayEater for arrayEater's function calls to work properly assuming the file stays as currently strucutred.

// Manager transformer

function makeManager(member) {
    // Code here in template literal form to plug back into the teamCode array

    return `
    <div class="teammember col-4">
        <div class="memberheader">
            <h4>${member.name}</h4>
            <h5><i class="fas fa-crown"></i>Manager</h5>
          </div>
          <div class="memberinfo">
            <p>ID: ${member.id}</p>
            <p>Email: <a href="mailto:${member.email}">${member.email}</a></p>
            <p>Office Number: ${member.officeNumber}</p>
          </div>
    </div>
    `
}

// Engineer transformer

function makeEngineer(member) {
    // Code here in template literal form to plug back into the teamCode array

    return `
    <div class="teammember col-4">
        <div class="memberheader">
            <h4>${member.name}</h4>
            <h5><i class="fas fa-cog"></i>Engineer</h5>
        </div>
        <div class="memberinfo">
            <p>ID: ${member.id}</p>
            <p>Email: <a href="mailto:${member.email}">${member.email}</a></p>
            <p>GitHub: <a href="https://github.com/${member.github}">${member.github}</a></p>
        </div>
    </div>
    `
}

// Intern transformer

function makeIntern(member) {
    // Code here in template literal form to plug back into the teamCode array
    
    return `
    <div class="teammember col-4">
        <div class="memberheader">
            <h4>${member.name}</h4>
            <h5><i class="fas fa-user-graduate"></i>Intern</h5>
        </div>
        <div class="memberinfo">
            <p>ID: ${member.id}</p>
            <p>Email: <a href="mailto:${member.email}">${member.email}</a></p>
            <p>School: ${member.school}</p>
    </div>
    `
}

// Function to generate the final code for the new index.html file

function pageGenerator(zeCode) {
    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Our Team</title>
    <link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
    integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
    crossorigin="anonymous"
    />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    </head>

    <body>

    <header>
        <nav>
        <h1>Our Team</h1>
        </nav>
    </header>

    <main>

        <div class="container" id="main-div">
        <div class="row justify-content-evenly">
            <!-- team member content will plug into this div -->
            ${zeCode}
        </div>
        </div>
    </main>

    </body>

    </html>
    `
}

// Function to prep the team array elements for HTML templating based on role

function arrayEater(theTeam) {

    // Array to store the processed team member blurbs for insertion into page HTML
    let teamCode = [];

    for (let i=0; i < theTeam.length; i++) {
    // Variable to hold each team member element for processing
    let member = theTeam[i]
    // Variable to capture the given member's role
    let role = member.getRole();
    
    if (role === "Manager") {
        // Kick the member to the manager transformer
        const madeManager = makeManager(member);

        // Kick the transformed manager data back to the teamCode array
        teamCode.push(madeManager);

        } else if (role === "Engineer") {
            // Kick the member to the engineer transformer
            const madeEngineer = makeEngineer(member);

            // Kick the transformed engineer data back to the teamCode array
            teamCode.push(madeEngineer);

        } else {
            // Kick the member to the intern transformer
            const madeIntern = makeIntern(member);

            // Kick the transformed intern data back to the teamCode array
            teamCode.push(madeIntern);

        }
    }

    // Transforms the completed teamCode from an array into a single code blurb
    let finalTeamCode = teamCode.join("");

    // Stores the full code in a variable for insertion into a writeFile function
    let shipIt = pageGenerator(finalTeamCode);

    // Writes an index.html file containing the processed team inputs and stores it in the ../dist directory

    fs.writeFile('./dist/index.html', shipIt, (err) => 
        err ? console.log(err) : console.log("Your team page has been generated!\nCheck the dist directory to find it.\n---------")
    );
}

// export

module.exports = {
    arrayEater
};