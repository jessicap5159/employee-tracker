const connection = require("./db/connection");


class DB {
 constructor(connection) {
     this.connection = connection;
 }

 viewAllDepartments () {
     return new Promise(function (resolve, reject) {
         var query = "SELECT * FROM departments"
       
         connection.query(query, (err,result)=> {
             if (err) return reject(err)
             resolve(result)
         })
     })
 
 };

 viewAllRoles() {
    return new Promise(function (resolve, reject) {
        var query = "SELECT * FROM roles"
      
        connection.query(query, (err,result)=> {
            if (err) return reject(err)
            resolve(result)
        })
    })
};

viewAllEmployees() {
    return new Promise(function (resolve, reject) {
        var query = "SELECT * FROM employees"
      
        connection.query(query, (err,result)=> {
            if (err) return reject(err)
            resolve(result)
        })
    })
};

addDepartment =(department_name) => { 
    console.log(department_name);
    return this.connection.promise().query(
        'INSERT INTO departments (department_name) VALUES (?)',department_name
        
    );
}


addRole = (title, salary, departments_id) => {
    console.log(title,salary,departments_id);
    return this.connection.promise().query(
        "INSERT INTO roles (title, salary, departments_id) VALUES (?,?,?)", [title, salary, departments_id]
    );
}

addEmployee = (first_name, last_name, roles_id, manager_id) => {
    console.log(first_name,last_name, roles_id, manager_id )
    return this.connection.promise().query(
        "INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?)", [first_name, last_name, roles_id, manager_id]
    );
}



updateEmployee(id, newRoleId) {
    return this.connection.promise().query(
        "UPDATE employees SET roles_id = ? WHERE id=?", [id, newRoleId]
    );
}

}
module.exports = DB;


