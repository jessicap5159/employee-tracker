const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const connection = require('./db/connection');
const DB = require('./queries');
const db = new DB(connection);

const viewAllDepartments = function() {
    db.viewAllDepartments().then((rows) => {
        console.log(rows)
    })
}

const viewAllRoles = function() {
    db.viewAllRoles().then((rows) => {
        console.log(rows)
    })
}

const viewAllEmployees = function() {
    db.viewAllEmployees().then((rows) => {
        console.log(rows)
    })
}
const userQuestions = () => {
    inquirer
    .prompt(
        {
            type: 'list',
            name: 'starterprompt',
            message: 'Which would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 
            'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],

        }).then(res => {
            console.log(res);
            switch(res.starterprompt) {
                case "View all departments":
            viewAllDepartments(); 
            }
            switch(res.starterprompt) {
                case "View all roles":
                   viewAllRoles(); 
            }
            switch(res.starterprompt) {
                case "View all employees":
                    viewAllEmployees(); 
            }
        })
//     // If view all departments, show all departments; if all roles, view all roles, etc
// switch (viewAll) {
//     case 'View all departments': // findAll depts
//     case 'View all roles' : // findAll roles
//     case 'View all employees': // find all employee
// }

    
// // If add department: 
  
//     {
//         type: 'input',
//         name: 'adddeptprompt',
//         message: 'Please enter the name of your department.'
//     },
//     // add dept to database:
//       // `INSERT INTO department (department_name) VALUES
//     // ('?'), ('?'), ('?');`
    
//     // If add role:

//     {
//         type: 'input',
//         name: 'addnameprompt',
//         message: 'Please enter the name of the role.'
//     },
//     {
//         type: 'input',
//         name: 'addsalaryprompt',
//         message: 'Please enter the salary for this role.'
//     },
//     {
//         type: 'input',
//         name: 'adddeptforrole',
//         message: 'Please enter the department id for this role.'
//     },

//     // add role to the database: //     
//     // INSERT INTO roles (title,salary,department_id) VALUES
// // ('?', '?', ?)

//     // If add employee:
//     {
//         type: 'input',
//         name: 'addempfirstname',
//         message: 'Please enter the first name of your employee.'
//     },{
//         type: 'input',
//         name: 'addemplastname',
//         message: 'Please enter the last name of your employee.'
//     },{
//         type: 'input',
//         name: 'addemprole',
//         message: 'Please enter the role of your employee.'
//     },{
//         type: 'input',
//         name: 'addempmanager',
//         message: "Please enter the name of your employee's manager."
//     },
//     // Add employee to database:
// //     INSERT INTO employees (first_name,last_name,role_id, manager_id) VALUES
// // ('?', '?', ?, ?);
    
// // If update employee role:
//     {
//         type: 'input',
//         name: 'updateempname',
//         message: "Please enter the name of the employee you'd like to update."
//     },{
//         type: 'input',
//         name: 'updateemprole',
//         message: 'Please enter the new role for your employee.'
//     },
//     // Update employee's information in database:
//     // UPDATE employees SET role_id=? WHERE id=? - how to find the right employee?
//     ])

    
}

userQuestions(); 
