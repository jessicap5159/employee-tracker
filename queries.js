

class DB {
 constructor(connection) {
     this.connection = connection;
 }

 viewAllDepartments () {
     return this.connection.promise().query(
         "SELECT * FROM departments"
     );

     
 }

 viewAllRoles() {
    return this.connection.promise().query(
        "SELECT * FROM roles"
    );
}

viewAllEmployees () {
    return this.connection.promise().query(
        "SELECT * FROM employees"
    );
}

}
module.exports = DB;