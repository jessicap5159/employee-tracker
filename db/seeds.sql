INSERT INTO departments (department_name) VALUES
('Sales'), ('Research'), ('Finance');

INSERT INTO roles (title,salary,departments_id) VALUES
('Manager', '100000.00', 1), ('Assistant', '50000.00', 1), ('Representative', '60000.00', 1);

INSERT INTO employees (first_name,last_name,roles_id, manager_id) VALUES
('Bob', 'Smith', 3, 1), ('Sally', 'Jones', 3, 2),('Laura', 'Johnson', 2, 2);