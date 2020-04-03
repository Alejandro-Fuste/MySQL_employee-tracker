const mysql = require('mysql');
const inquirer = require('inquirer');
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

			case 'Add Department':
				addDepartment();
				break;

			case 'Add Role':
				addRole();
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
	let query = `SELECT employee.id, employee.first_name, employee.last_name, company_role.title, department.name_depart, company_role.salary, manager.manager
	FROM department RIGHT JOIN company_role ON department.id = company_role.department_id
	RIGHT JOIN employee ON company_role.id = employee.role_id
	RIGHT JOIN manager ON manager.id = employee.manager_id ORDER BY employee.id`;
	connection.query(query, function(err, res) {
		if (err) throw err;

		console.table(res);

		startPrompt();
	});
}

// This function is to view all employees in the databse by department ==================================================

function viewByDepartment() {
	let query = `SELECT department.name_depart
	FROM company_db.department ORDER BY department.id;`;

	connection.query(query, function(err, res) {
		if (err) throw err;

		const departList = res.map((d) => d.name_depart);

		inquirer
			.prompt({
				type: 'list',
				name: 'department',
				message: 'What department would you like to see?',
				choices: departList
			})
			.then((answer) => {
				let roleIndex = departList.indexOf(answer.department) + 1;

				console.log(roleIndex);

				let query = `SELECT employee.id, employee.first_name, employee.last_name, company_role.title, department.name_depart, company_role.salary, manager.manager
				FROM department RIGHT JOIN company_role ON department.id = company_role.department_id
				RIGHT JOIN employee ON company_role.id = employee.role_id
				RIGHT JOIN manager ON manager.id = employee.manager_id
				WHERE department.id = ? ORDER BY employee.id;`;

				connection.query(query, [ roleIndex ], function(err, res) {
					if (err) throw err;

					console.table(res);

					startPrompt();
				});
			});
	});
}

// This function is to view all employees in the databse by their roles ==================================================

function viewByManager() {
	let query = `SELECT manager.manager
	FROM company_db.manager ORDER BY manager.id;`;

	connection.query(query, function(err, res) {
		if (err) throw err;

		const managerList = res.map((m) => m.manager);

		inquirer
			.prompt({
				type: 'list',
				name: 'man',
				message: 'Select the manager to see his employees',
				choices: managerList
			})
			.then((answer) => {
				let roleIndex = managerList.indexOf(answer.man) + 1;

				let query = `SELECT employee.id, employee.first_name, employee.last_name, company_role.title, department.name_depart, company_role.salary, manager.manager
			FROM department RIGHT JOIN company_role ON department.id = company_role.department_id
			RIGHT JOIN employee ON company_role.id = employee.role_id
			RIGHT JOIN manager ON manager.id = employee.manager_id
			WHERE manager.id = ? ORDER BY employee.id;`;

				connection.query(query, [ roleIndex ], function(err, res) {
					if (err) throw err;

					console.table(res);

					startPrompt();
				});
			});
	});
}

// This function is to add an employee to the database ==================================================

function addEmployee() {
	let query = `SELECT company_role.title
	FROM company_db.company_role ORDER BY company_role.id;`;

	connection.query(query, function(err, res) {
		if (err) throw err;

		const titleList = res.map((t) => t.title);

		connection.query(`SELECT manager.manager FROM company_db.manager ORDER BY manager.id;`, function(err, res) {
			if (err) throw err;

			const manList = res.map((m) => m.manager);

			inquirer
				.prompt([
					{
						type: 'input',
						name: 'fname',
						message: 'What is the first name of the employee?'
					},
					{
						type: 'input',
						name: 'lname',
						message: 'What is the last name of the employee?'
					},
					{
						type: 'list',
						name: 'role',
						message: 'What is the role of the employee?',
						choices: titleList
					},
					{
						type: 'list',
						name: 'manager',
						message: 'Who is the manager of the employee?',
						choices: manList
					}
				])
				.then((answer) => {
					let roleIndex = titleList.indexOf(answer.role) + 1;
					let manIndex = manList.indexOf(answer.manager) + 1;

					connection.query(
						'INSERT INTO employee SET ?',
						{
							first_name: answer.fname,
							last_name: answer.lname,
							role_id: roleIndex,
							manager_id: manIndex
						},
						function(err, res) {
							if (err) throw err;

							console.log('The employee was added.');

							startPrompt();
						}
					);
				});
		});
	});
}

// This function is to add a department to the database ==================================================
function addDepartment() {
	inquirer.prompt(questions.addDepartment).then((answer) => {
		connection.query(
			'INSERT INTO department SET ?',
			{
				name_depart: answer.depart
			},
			function(err, res) {
				if (err) throw err;

				console.log('The department was added.');

				startPrompt();
			}
		);
	});
}

// This function is to add a role to the database ==================================================
function addRole() {
	// Query to get updated department list
	let query = `SELECT department.name_depart
	FROM company_db.department ORDER BY department.id;`;

	connection.query(query, function(err, res) {
		if (err) throw err;

		const depList = res.map((dep) => dep.name_depart);

		inquirer
			.prompt([
				{
					type: 'input',
					name: 'rol',
					message: 'What role (title) would you like to add?'
				},
				{
					type: 'input',
					name: 'sal',
					message: 'How much will the salary be?'
				},
				{
					type: 'list',
					name: 'dep',
					message: 'What department will this role be added to?',
					choices: depList
				}
			])
			.then((answer) => {
				let depIndex = depList.indexOf(answer.dep);
				connection.query(
					'INSERT INTO company_role SET ?',
					{
						title: answer.rol,
						salary: answer.sal,
						department_id: depIndex
					},
					function(err, res) {
						if (err) throw err;

						console.log('The department was added.');

						startPrompt();
					}
				);
			});

		// Query to add role to company_role table
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
		let sli = questions.updateEmployMan[0].choices;

		let newSli = sli.indexOf(answer.selectEm);

		// This will split the string of the selected employee
		let spl = questions.updateEmployMan[1].choices;

		let newString = spl.indexOf(answer.newMan);

		connection.query(query, [ newString, newSli ], function(err, res) {
			if (err) throw err;

			console.log('The employee manager was updated.');

			startPrompt();
		});
	});
}
