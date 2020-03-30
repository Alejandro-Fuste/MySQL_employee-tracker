DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name_depart VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE company_role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NULL,
    salary DECIMAL NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)

);

CREATE TABLE manager (
    id INT AUTO_INCREMENT NOT NULL,
    manager VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES company_role(id),
    FOREIGN KEY (manager_id) REFERENCES manager(id)
);



-- SELECT * FROM department;
-- SELECT * FROM company_role;
-- SELECT * FROM employee;
-- SELECT * FROM managers;

-- SELECT  employee.id, employee.first_name, employee.last_name, company_role.title, department.name_depart, company_role.salary, manager.manager
-- FROM department LEFT JOIN company_role ON department.id = company_role.department_id
-- INNER JOIN employee ON employee.id = company_role.id
-- INNER JOIN manager ON manager.id = employee.manager_id;

SELECT  employee.id, employee.first_name, employee.last_name, company_role.title, department.name_depart, company_role.salary, manager.manager
FROM department LEFT JOIN company_role ON department.id = company_role.department_id
RIGHT JOIN employee ON employee.id = company_role.id
INNER JOIN manager ON manager.id = employee.manager_id;