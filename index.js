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
        manager = Manager(managerData.managerName, managerData.managerID, managerData.managerEmail, managerData.numberofoffice, managerData.teamTitle);
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
    }
    ])
  }
};
 