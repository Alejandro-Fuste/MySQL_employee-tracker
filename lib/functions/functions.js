const connection = require('../../connection/connection');
const inquirer = require('inquirer');
const questions = require('../inquirer/questions');

const functions = {
	startPrompt: function startPrompt() {
		inquirer.prompt(questions.start).then((res) => {
			// Switch Statement to do different actions based on answer choice
			//
			switch (res.toDo) {
				case 'View All Employees':
					functions.viewEmp();
					break;

				case 'View All Employees By Department':
					functions.viewByDepartment();
					break;

				case 'View All Employees By Manager':
					functions.viewByManager();
					break;

				case 'Add Department':
					functions.addDepartment();
					break;

				case 'Add Role':
					functions.addRole();
					break;

				case 'Add Employee':
					functions.addEmployee();
					break;

				case 'Remove Employee':
					functions.removeEmployee();
					break;

				case 'Update Employee Role':
					functions.updateEmployeeRole();
					break;

				case 'Update Employee Manager':
					functions.updateEmployeeManager();
					break;

				default:
					console.log('Exit');
					break;
			}
		});
	},
	viewEmp: function() {
		let query = `SELECT employee.id, employee.first_name, employee.last_name, company_role.title, department.name_depart, company_role.salary, manager.manager
        FROM department RIGHT JOIN company_role ON department.id = company_role.department_id
        RIGHT JOIN employee ON company_role.id = employee.role_id
        RIGHT JOIN manager ON manager.id = employee.manager_id ORDER BY employee.id`;
		connection.query(query, function(err, res) {
			if (err) throw err;

			console.table(res);

			functions.startPrompt();
		});
	},
	viewByDepartment: function() {
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

						functions.startPrompt();
					});
				});
		});
	},
	viewByManager: function() {
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

						functions.startPrompt();
					});
				});
		});
	},
	addEmployee: function() {
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

								functions.startPrompt();
							}
						);
					});
			});
		});
	},
	addDepartment: function() {
		inquirer.prompt(questions.addDepartment).then((answer) => {
			connection.query(
				'INSERT INTO department SET ?',
				{
					name_depart: answer.depart
				},
				function(err, res) {
					if (err) throw err;

					console.log('The department was added.');

					functions.startPrompt();
				}
			);
		});
	},
	addRole: function() {
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

							functions.startPrompt();
						}
					);
				});

			// Query to add role to company_role table
		});
	},
	removeEmployee: function() {
		let query = `SELECT employee.first_name, employee.last_name
	FROM company_db.employee ORDER BY employee.id;`;

		connection.query(query, function(err, res) {
			if (err) throw err;

			const emplList = res.map((e) => e.first_name + ' ' + e.last_name);

			inquirer
				.prompt({
					type: 'list',
					name: 'remove',
					message: 'Which employee would you like to remove?',
					choices: emplList
				})
				.then((answer) => {
					let roleIndex = emplList.indexOf(answer.remove) + 1;

					let query = `DELETE FROM employee WHERE id = ?;`;

					connection.query(query, [ roleIndex ], function(err, res) {
						if (err) throw err;

						console.log('The employee was removed.');

						functions.startPrompt();
					});
				});
		});
	},
	updateEmployeeRole: function() {
		let query = `SELECT employee.first_name, employee.last_name
	FROM company_db.employee ORDER BY employee.id;`;

		let query2 = `SELECT company_role.title
	FROM company_db.company_role ORDER BY company_role.id;`;

		connection.query(query, function(err, res) {
			if (err) throw err;

			const emplList = res.map((e) => e.first_name + ' ' + e.last_name);

			connection.query(query2, function(err, results) {
				if (err) throw err;

				const roleList = results.map((t) => t.title);

				inquirer
					.prompt([
						{
							type: 'list',
							name: 'selectEmp',
							message: 'Which employee would you like to update?',
							choices: emplList
						},
						{
							type: 'list',
							name: 'newRole',
							message: 'What will be the new role of this employee?',
							choices: roleList
						}
					])
					.then((answer) => {
						let roleIndex = roleList.indexOf(answer.newRole) + 1;

						let empIndex = emplList.indexOf(answer.selectEmp) + 1;

						let query = `UPDATE employee SET role_id = ? WHERE id = ?;`;

						connection.query(query, [ roleIndex, empIndex ], function(err, res) {
							if (err) throw err;

							console.log('The employee role was updated.');

							functions.startPrompt();
						});
					});
			});
		});
	},
	updateEmployeeManager: function() {
		let query = `SELECT employee.first_name, employee.last_name
	FROM company_db.employee ORDER BY employee.id;`;

		let query2 = `SELECT manager.manager FROM company_db.manager ORDER BY manager.id;`;

		connection.query(query, function(err, res) {
			if (err) throw err;

			const emplList = res.map((e) => e.first_name + ' ' + e.last_name);

			connection.query(query2, function(err, results) {
				if (err) throw err;

				const manList = results.map((m) => m.manager);

				inquirer
					.prompt([
						{
							type: 'list',
							name: 'selectEm',
							message: 'Which employee would you like to update?',
							choices: emplList
						},
						{
							type: 'list',
							name: 'newMan',
							message: 'Who will be the new manager of this employee?',
							choices: manList
						}
					])
					.then((answer) => {
						let manIndex = manList.indexOf(answer.newMan) + 1;

						let empIndex = emplList.indexOf(answer.selectEm) + 1;

						let query = `UPDATE employee SET manager_id = ? WHERE id = ?;`;

						connection.query(query, [ manIndex, empIndex ], function(err, res) {
							if (err) throw err;

							console.log('The employee manager was updated.');

							functions.startPrompt();
						});
					});
			});
		});
	}
};

module.exports = functions;
