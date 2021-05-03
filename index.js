const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const connection = require('./db/connection');
const DB = require('./queries');
const db = new DB(connection);

const viewAllDepartments = function () {
    db.viewAllDepartments().then((rows) => {
        console.table(rows)
    })
}

const viewAllRoles = function () {
    return db.viewAllRoles();
}

const viewAllEmployees = function () {
    return db.viewAllEmployees();
}

const addDepartment = function () {
    db.addDepartment().then((rows) => {
        console.table(rows)
    })
}

const addRole = function () {
    db.addRole().then((rows) => {
        console.log(rows)
    })
}

const addEmployee = function () {
    db.addEmployee().then((rows) => {
        console.log(rows)
    })
}

const updateEmployee = function () {
    return db.updateEmployee();
}

const addDeptQuestions = function () {
    return inquirer.prompt({
        type: 'input',
        name: 'adddeptprompt',
        message: 'Please enter the name of your department.'
    })
}


const addRoleQuestions = function () {
    return inquirer.prompt([{

        type: 'input',
        name: 'addnameprompt',
        message: 'Please enter the name of the role.'
    },
    {
        type: 'input',
        name: 'addsalaryprompt',
        message: 'Please enter the salary for this role.'
    },
    ]);
}

const addEmployeeQuestions = function () {
    return inquirer.prompt([{

        type: 'input',
        name: 'addempfirstname',
        message: 'Please enter the first name of your employee.'
    },
    {
        type: 'input',
        name: 'addemplastname',
        message: 'Please enter the last name of your employee.'
    }]);
};
const userQuestions = () => {
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'starterprompt',
                message: 'Which would you like to do?',
                choices: ['View all departments', 'View all roles', 'View all employees',
                    'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit'],

            }).then(res => {
                console.log(res);
                switch (res.starterprompt) {
                    case "View all departments":
                        viewAllDepartments();
                        userQuestions();
                        break;

                    case "View all roles":
                        viewAllRoles().then((rows) => {
                            console.table(rows);
                            userQuestions();
                        });

                        break;

                    case "View all employees":
                        viewAllEmployees().then((rows) => {
                            console.table(rows);
                            userQuestions();
                        });

                        break;

                    case "Add a department":

                        addDeptQuestions()
                            .then(answer => {
                                console.log(answer);
                                db.addDepartment(answer.adddeptprompt)
                                    .then(() => {
                                        console.log('added department');
                                        userQuestions();
                                    })


                            })

                        break;

                    case "Add a role":
                        addRoleQuestions()
                            .then(answer => {
                                const { addnameprompt, addsalaryprompt } = answer
                                console.log(answer);
                                db.viewAllDepartments().then((rows) => {
                                    console.table(rows)
                                    let deptChoices = rows.map(({ id, title, salary, departments_id }) => id);

                                    inquirer.prompt([{ type: 'list', name: 'deptId', message: 'Choose the id of the department for your employee.', choices: deptChoices }])
                                        .then(({ deptId }) => {
                                            console.log(deptId);
                                            db.addRole(addnameprompt, addsalaryprompt, deptId);
                                        })

                                        .then(() => {
                                            console.log('Added role');
                                            userQuestions();

                                        });
                                });
                            });
                        break;


                    case "Add an employee":
                        // first_name, last_name, roles_id, manager_id
                        addEmployeeQuestions().then(answer => 
                            {
                            const { addempfirstname, addemplastname } = answer
                            console.log(answer);
                            db.viewAllRoles().then((rows) => 
                            {
                                console.table(rows)
                                let rolesChoices = rows.map(({ id, title }) => {return {name:title, value:id}});
                                inquirer.prompt({ type: 'list', name: 'rolesId', message: 'Choose the id of the role for your employee.', choices: rolesChoices })
                                     .then(({ rolesId }) => {
                                         console.log(rolesId)
                        //                     .then(() => {
                                                db.viewAllEmployees().then((rows) => {
                                                    console.table(rows)
                                                    let managerChoices = rows.map(({ manager_id, first_name, last_name }) => {return {name: `${first_name} ${last_name}`, value:manager_id}})
                                                    inquirer.prompt({ type: 'list', name: 'managerId', message: 'Choose the manager for your employee.', choices: managerChoices })
                                                        .then(({ managerId }) => {
                                                            console.log(managerId)
                                                             db.addEmployee(addempfirstname,addemplastname, rolesId, managerId)
                                                                 .then(() => {
                                                                     console.log('Added employee');
                                                                     userQuestions();
                                                                 });
                                                        });
                                                });
                        //                     });
                                    });
                            });
                        });



                        break;


                    case "Update an employee role":
                        viewAllEmployees().then((rows) => {
                            console.table(rows)
                            let choices = rows.map(({ id, first_name, last_name }) => id);

                            inquirer.prompt([{ type: 'list', name: 'empId', message: 'Choose id of employee you want to change.', choices: choices }])
                                .then(({ empId }) => {
                                    console.log(empId);
                                    viewAllRoles().then((rows) => {
                                        console.table(rows)
                                        let roleChoices = rows.map(({ id }) => id);
                                        inquirer.prompt([{ type: 'list', name: 'roleId', message: 'Choose the new role of your employee.', choices: roleChoices }])
                                            .then(({ roleId }) => {
                                                console.log(roleId);
                                                updateEmployee(empId, roleId)
                                                    .then(console.log('Role updated'));
                                                userQuestions();
                                            });
                                    });
                                });
                        });
                        break;

                    case "Exit":
                        process.exit();






                    // updateEmployee(id, newRoleId); // put id of whom to update in parenthesis, then comma and roles_id
                    // let employees = db.viewAllEmployees.map({ name: first_name, value: id })
                    // choices: employees;
                    // 1. Get all employees function
                    // 2. Create array for inquirer: 
                    // let employees = db.viewAllEmployees.map{name: first_name, value: id}
                    // choices: employees

                }

            });



    //     // If add employee:
    //     
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
