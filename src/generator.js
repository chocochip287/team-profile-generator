/*
1/13/2023
To do
----
* finish setup on the role maker functions and validate their outputs
* finish the page "shell" in the index.html file then bring that here.

*/

// function to prep the team array elements for HTML templating based on role

function arrayEater(theTeam) {

    // array to store the processed team member blurbs for insertion into page HTML
    let teamCode = [];

    for (let i=0; i < theTeam.length; i++) {
    // variable to hold each team member element for processing
    let member = theTeam[i]
    // variable to capture the given member's role
    let role = member.getRole();
    
    if (role === "Manager") {
        // kick the member to the manager transformer
        const madeManager = makeManager(member);

        // kick the transformed manager data back to the teamCode array
        teamCode.push(madeManager);

        } else if (role === "Engineer") {
            // kick the member to the engineer transformer
            const madeEngineer = makeEngineer(member);

            // kick the transformed engineer data back to the teamCode array
            teamCode.push(madeEngineer);

        } else {
            // kick the member to the intern transformer
            const madeIntern = makeIntern(member);

            // kick the transformed intern data back to the teamCode array
            teamCode.push(madeIntern);

        }
    }
}

// functions to transform team member elements into HTML blurbs - these should return their outputs to arrayEater.

// manager transformer

function makeManager(member) {
    // code here in template literal form to plug back into the teamCode array
    /*
    return
    `
    <div class="teammember col-4">
        <div class="memberheader">
            <h4>Bob</h4>
            <h5><i class="fas fa-crown"></i>Manager</h5>
          </div>
          <div class="memberinfo">
            <p>ID:</p>
            <p>Email:</p>
            <p>Office Number:</p>
          </div>
    </div>
    `
    */
}

// engineer transformer

function makeEngineer(member) {
    // code here in template literal form to plug back into the teamCode array
    /*
    return
    `
    <div class="teammember col-4">
        <div class="memberheader">
            <h4>Bob</h4>
            <h5><i class="fas fa-cog"></i>Engineer</h5>
        </div>
        <div class="memberinfo">
            <p>aaaa</p>
            <p>bbbb</p>
            <p>cccc</p>
        </div>
    </div>
    `
    */
}

// intern transformer

function makeIntern(member) {
    // code here in template literal form to plug back into the teamCode array
    /*
    return
    `
    <div class="teammember col-4">
        <div class="memberheader">
            <h4>Bob</h4>
            <h5><i class="fas fa-user-graduate"></i>Intern</h5>
        </div>
        <div class="memberinfo">
            <p>ID:</p>
            <p>Email:</p>
            <p>School:</p>
    </div>
    `
    */
}

// export

module.exports = {
    arrayEater
};