  const inquirer = require('inquirer');
  const fs = require('fs');
  // Epmployee template based on thise below.
  const Manager = require("./lib/Manager");
  const Intern = require("./lib/Intern");
  const Engineer = require("./lib/Engineer");
  const { type } = require('os');
  // array fills with employee data
  const teamMembers = [];
  // manager will change so hast to be a let
  let manager;
  // info is for html
  let teamTitle;
  // function manager data
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
    }]).then(managerAnswers => {
        manager = Manager(managerAnswers.managerName, managerAnswers.managerID, managerAnswers.managerEmail, managerAnswers.numberofoffice, managerAnswers.teamTitle);
        console.log("now ask for employee information")
        lesserEmployeeData();
       });
    // function will repeat if more than one employee is needed   
    function lesserEmployeeData(){
    inquirer.prompt([
     {// employeerole arreay
      type: 'list',
      name: 'EmployeeRole',
      message: 'what is this empolyee role',
      choices: ['Intern', 'Engineer']
     },{// questions for employee
      type: 'input',
       name: '',
       message: ''
     },{
       type: 'input',
       name: '',
       message: ''
     },{
      type: 'input',
      name: '',
      message: ''
    },{
      type: 'input',
      name: '',
      message: '',
      when:
    },{
      type: 'input',
      name: '',
      message: '',
      when:
    },{
      type: 'input',
      name: '',
      message: ''
    }
    ])
  }
};
 