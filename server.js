const mysql = require('mysql');
const inquirer = require('inquirer');
var Table = require('cli-table');
const questions = require('./lib/inquirer/questions');
var figlet = require('figlet');

const connection = mysql.createConnection({
	host: 'localhost',

	// Your port; if not 3306
	port: 3306,

	// Your username
	user: 'root',

	// Your password
	password: 'yourRootPassword',
	database: 'company_db'
});

fig();

connection.connect(function(err) {
	if (err) throw err;
	// Put the function that starts the prompt here
	startPrompt();
});

function fig() {
	figlet('Employee Tracker', function(err, data) {
		if (err) {
			console.log('Something went wrong...');
			console.dir(err);
			return;
		}
		console.log(data);
	});
}

// This function starts the CMS program ====================================================

function startPrompt() {
	inquirer.prompt(questions.start).then((res) => {
		// Switch Statement to do different actions based on answer choice
		//
		switch (res.toDo) {
			case 'View All Employees':
				viewEmployess();
				break;

			case 'View All Employees By Department':
				viewByDepartment();
				break;

			case 'View All Employees By Manager':
				viewByManager();
				break;

			case 'Add Employee':
				addEmployee();
				break;

			case 'Remove Employee':
				removeEmployee();
				break;

			case 'Update Employee Role':
				updateEmployeeRole();
				break;

			case 'Update Employee Manager':
				updateEmployeeManager();
				break;

			default:
				console.log('Exit');
				break;
		}
	});
}

// This function is to view all employees in the databse ==================================================

function viewEmployess() {
	let query = `SELECT  employee.id, employee.first_name, employee.last_name, company_role.title, department.name_depart, company_role.salary, manager.manager
	FROM department LEFT JOIN company_role ON department.id = company_role.department_id
	INNER JOIN employee ON employee.id = company_role.id
	INNER JOIN manager ON manager.id = employee.manager_id;`;
	connection.query(query, function(err, res) {
		if (err) throw err;

		console.table(res);

		startPrompt();
	});
}

// This function is to view all employees in the databse by department ==================================================

function viewByDepartment() {
	inquirer.prompt(questions.viewDepart).then((answer) => {
		let query = `SELECT  employee.id, employee.first_name, employee.last_name, company_role.title, department.name_depart, company_role.salary, manager.manager
		FROM department LEFT JOIN company_role ON department.id = company_role.department_id
		INNER JOIN employee ON employee.id = company_role.id
		INNER JOIN manager ON manager.id = employee.manager_id
		WHERE department.name_depart = ?;`;

		connection.query(query, [ answer.department ], function(err, res) {
			if (err) throw err;

			console.table(res);

			startPrompt();
		});
	});
}

// This function is to view all employees in the databse by their roles ==================================================

function viewByManager() {
	inquirer.prompt(questions.viewManager).then((answer) => {
		let query = `SELECT  employee.id, employee.first_name, employee.last_name, company_role.title, department.name_depart, company_role.salary, manager.manager
		FROM department LEFT JOIN company_role ON department.id = company_role.department_id
		RIGHT JOIN employee ON employee.id = company_role.id
		INNER JOIN manager ON manager.id = employee.manager_id;`;

		connection.query(query, [ answer.man ], function(err, res) {
			if (err) throw err;

			console.table(res);

			startPrompt();
		});
	});
}

// This function is to add an employee to the database ==================================================

function addEmployee() {
	inquirer.prompt(questions.addEmploy).then((answer) => {
		connection.query(
			'INSERT INTO employee SET ?',
			{
				first_name: answer.fname,
				last_name: answer.lname,
				role_id: answer.role,
				manager_id: answer.manager
			},
			function(err, res) {
				if (err) throw err;

				console.log('The employee was added.');

				startPrompt();
			}
		);

		// let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
		// VALUES (?, ?, ?, ? );`;

		// connection.query(query, [ answer.fname, answer.lname, answer.role, answer.manager ], function(err, res) {
		// 	if (err) throw err;

		// 	console.table(res.affectedRows);

		// 	startPrompt();
		// });
	});
}

// This function is to remove an employee from the database ==================================================

function removeEmployee() {
	inquirer.prompt(questions.removeEmploy).then((answer) => {
		let query = `DELETE FROM employee WHERE first_name = ? AND last_name = ?;`;

		let spl = answer.remove;
		let newString = spl.split(' ');

		connection.query(query, [ newString[0], newString[1] ], function(err, res) {
			if (err) throw err;

			console.log('The employee was removed.');

			startPrompt();
		});
	});
}

// This function is to update an employee role to the database ==================================================

function updateEmployeeRole() {
	inquirer.prompt(questions.updateEmployRole).then((answer) => {
		let query = `UPDATE employee SET role_id = ? WHERE id = ?;`;

		// This will slice the string of the selection
		let sli = answer.newRole;
		let newSli = sli.slice(0, 1);

		// This will split the string of the selected employee
		let sl = answer.selectEmp;
		let newString = sl.slice(0, 1);

		connection.query(query, [ newSli, newString ], function(err, res) {
			if (err) throw err;

			console.log('The employee role was updated.');

			startPrompt();
		});
	});
}

// This function is to update an employee role to the database ==================================================

function updateEmployeeManager() {
	inquirer.prompt(questions.updateEmployMan).then((answer) => {
		let query = `UPDATE employee SET manager_id = ? WHERE id = ?;`;

		// This will slice the string of the selection
		let sli = answer.newMan;
		let newSli = sli.slice(0, 1);

		// This will split the string of the selected employee
		let spl = answer.selectEm;
		let newString = spl.slice(0, 1);

		connection.query(query, [ newSli, newString ], function(err, res) {
			if (err) throw err;

			console.log('The employee manager was updated.');

			startPrompt();
		});
	});
}
