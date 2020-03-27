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
    first_name VARCHAR(30),
    last_name VARCHAR(30),
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



INSERT INTO department (name_depart)
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO company_role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1), ('Salesperson', 80000, 1), ('Lead Engineer', 150000, 2), ('Software Engineer', 120000, 2), ('Accountant', 125000, 3), ('Legal Team Lead', 250000, 4), ('Lawyer', 190000, 4);

INSERT INTO manager (first_name, last_name)
VALUES ('Yoda', 'Unknown'), ('Obi-Wan', 'Kenobi'), ('Mace', 'Windu');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Luke', 'Skywalker', 1, 1 ), ('Rey', 'Skywalker', 2, 1), ('Leia', 'Organa', 3, 2), ('Ben', 'Solo', 4, 2), ('Lando', 'Calrissian', 5, 3), ('Finn', 'Schwartz', 6, 3), ('Poe', 'Dameron', 7, 3);

