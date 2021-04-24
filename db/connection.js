const mysql = require('mysql2');
const connection = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: "macaroni123",
    database: 'employeetracker'
  },
  console.log('Connected to the employeetracker database')
  );

  connection.connect(function(err) {
      if(err) throw err; 
  })

  module.exports = connection; 