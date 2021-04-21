const inquirer = require('inquirer');

const userQuestions = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'starterprompt',
            message: 'Which would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 
            'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],

        },
    // If view all departments, show all departments; if all roles, view all roles, etc
    // If add department:
    {
        type: 'input',
        name: 'adddeptprompt',
        message: 'Please enter the name of your department.'
    },
    // add dept to database
    // If add role:
    {
        type: 'input',
        name: 'addnameprompt',
        message: 'Please enter the name of the role.'
    },
    {
        type: 'input',
        name: 'addsalaryprompt',
        message: 'Please enter the salary for this role.'
    },
    {
        type: 'input',
        name: 'adddeptforrole',
        message: 'Please enter the department for this role.'
    },
    // add role to the database
    // If add employee:
    {
        type: 'input',
        name: 'addempfirstname',
        message: 'Please enter the first name of your employee.'
    },{
        type: 'input',
        name: 'addemplastname',
        message: 'Please enter the last name of your employee.'
    },{
        type: 'input',
        name: 'addemprole',
        message: 'Please enter the role of your employee.'
    },{
        type: 'input',
        name: 'addempmanager',
        message: "Please enter the name of your employee's manager."
    },
    // Add employee to database
    // If update employee role:
    {
        type: 'input',
        name: 'updateempname',
        message: "Please enter the name the employee you'd like to update."
    },{
        type: 'input',
        name: 'updateemprole',
        message: 'Please enter the new role for your employee.'
    },
    // Update employee's information in database
    ])



    
}
