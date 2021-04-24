DROP DATABASE IF EXISTS employeetracker;
CREATE DATABASE employeetracker;
USE employeetracker;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL (10,2),
    departments_id INTEGER,
     PRIMARY KEY(id),
  CONSTRAINT fk_department FOREIGN KEY (departments_id) REFERENCES departments(id) ON DELETE SET NULL,
  INDEX dep_ind (departments_id)
);


CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INTEGER,
    manager_id INTEGER,
      CONSTRAINT fk_role FOREIGN KEY (roles_id) REFERENCES roles(id) ON DELETE SET NULL,
  CONSTRAINT fk_managerid FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);

