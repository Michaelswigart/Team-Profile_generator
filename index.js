    const inquirer = require('inquirer');
    const fs = require('fs');
    // Epmployee template based on thise below.
    const Manager = require("./lib/Manager");
    const Intern = require("./lib/Intern");
    const Engineer = require("./lib/Engineer");
    // array fills with employee data
    const teamMembers = [];
    // manager will change so must be a let var
    let manager;
    // info is for html
    let teamTitle;
    // function manager data arrey
    function managerData() {
    inquirer.prompt([
    { // fill html with teamName
      type: 'input',
      name: 'teamTitle',
      message: 'what is the name of your team/project',
    },{ // there is only one manager for a team
      type: 'input',
      name: 'managerName',
      message: 'who is the manager of this project',
    },{ // Employee ID
      type: 'input',
      name: 'managerID',
      message: 'what is the manager name'
    },{ // Employee Email
      type: 'input',
      name: 'manager Email',
      message: 'what is a manager email'
    },{ // manager office number
      type: 'input',
      name: 'number of office',
      message: 'what is the manager office number',
    }]).then(managerData => {
        manager = new Manager(managerData.managerName, managerData.managerID, managerData.managerEmail, managerData.numberofoffice, managerData.teamTitle);
        console.log("now ask for employee information")
        employeeData();
    });// function will repeat if more than one employee is needed   
       function employeeData(){
       inquirer.prompt([
    { // employeerole arreay
       type: 'list',
       name: 'EmployeeRole',
       message: 'what is this empolyee role',
       choices: ['Intern', 'Engineer']
    },{ // questions for employee
        type: 'input',
        name: 'employeeName',
        message: 'what is the employee name'
    },{ type: 'input',
        name: 'employeeID',
        message: 'what is the employee id'
    },{ type: 'input',
        name: 'employeeEmail',
        message: 'what is the employee email'
    },{ type: 'input',
        name: 'github',
        message: 'what is the engineers GitHub',
        when: (userInput) => userInput.employeeRole === "Engineer"
    },{ type: 'input',
        name: 'school',
        message: 'what is the Interns school',
        when: ( userInput) => userInput.employeeRole === "Intern"
    },{ type: 'input',
        name: 'newEmployee',
        message: 'would you like to add another team member'
        // if you choose yes it will go back to the start and if you choose no it will renderHTML
    }// push new intern into team members array
    ]).then(answers => {
     if (answers.employeeRole === 'Intern') {
       const employee = new Intern(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.school);
       teamMembers.push(employee);
     } else if (answers.employeeRole === 'Engineer') {
       // a different way of pushing teamMembers array
       teamMembers.push(new Engineer(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.github));
     }
      if (answers.newEmployee === true) {
        employeeData();
      } else {
        // render html
        var main = fs.readFileSync('./templates/main.html', 'utf8');
        // loop through the employees and print out all of their cards without replacing the previous one
        main = main.replace(/{{teamTile}}/g, teamTitle);
        var managerCard = fs.readFileSync('./templates/Manager.html', 'utf-8');
        managerCard = managerCard.replace('{{name}}', manager.getName());
        managerCard = managerCard.replace('{{role}}', manager.getRole());
        managerCard = managerCard.replace('{{id}}', manager.getId());
        managerCard = managerCard.replace('{{email}}', manager.getEmail());
        managerCard = managerCard.replace('{{officeNumber}}', manager.getOfficeNumber());// append all of team members after manager 
        var cards = managerCard;
        for (var i = 0; i < teamMembers.length; i++) {
          var employee = teamMembers[i];
          // cards adds and then equals every new employee card info
          cards += renderEmployee(employee);
        }
        // add cards to main.html and outputs to team.html
        main = main.replace('{{cards}}', cards);
        fs.writeFileSync('./output/team.html', main);
        //
        console.log("The team.html has been generated in output");
      }
  }); 
}
} // renderEmployeefunction that is called above
  function renderEmployee(employee) {
    if (employee.getRole() === "Intern") {
        var internCard = fs.readFileSync('./templates/Intern.html', 'utf8');
        internCard = internCard.replace('{{name}}', employee.getName());
        internCard = internCard.replace('{{role}}', employee.getRole());
        internCard = internCard.replace('{{id}}', employee.getId());
        internCard = internCard.replace('{{email}}', employee.getEmail());
        internCard = internCard.replace('{{school}}', employee.getSchool());
        return internCard;
    } else if (employee.getRole() === "Engineer") {
        var engineerCard = fs.readFileSync('./templates/Engineer.html', 'utf8');
        engineerCard = engineerCard.replace('{{name}}', employee.getName());
        engineerCard = engineerCard.replace('{{role}}', employee.getRole());
        engineerCard = engineerCard.replace('{{id}}', employee.getId());
        engineerCard = engineerCard.replace('{{email}}', employee.getEmail());
        engineerCard = engineerCard.replace('{{github}}', employee.getGithub());
        return engineerCard;
    }
}
managerData();