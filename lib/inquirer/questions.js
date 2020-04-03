const questions = {
	// Need questions for what they want to do
	// choices will need to include:
	// add department, roles, employees (each needs to be its own line)
	// view department, roles, employees (each needs to be its own line)
	// update employee roles
	start: [
		{
			type: 'list',
			name: 'toDo',
			message: 'What would you like to do?',
			choices: [
				'View All Employees',
				'View All Employees By Department',
				'View All Employees By Manager',
				'Add Employee',
				'Add Department',
				'Add Role',
				'Remove Employee',
				'Update Employee Role',
				'Update Employee Manager',
				'Quit Program'
			]
		}
	],
	addDepartment: [
		{
			type: 'input',
			name: 'depart',
			message: 'What department would you like to add?'
		}
	],
	updateEmployRole: [
		{
			type: 'list',
			name: 'selectEmp',
			message: 'Which employee would you like to update?',
			choices: [
				'Luke Skywalker',
				'Rey Skywalker',
				'Leia Organa',
				'Ben Solo',
				'Lando Calrissian',
				'Finn Schwartz',
				'Poe Dameron'
			]
		},
		{
			type: 'list',
			name: 'newRole',
			message: 'What will be the new role of this employee?',
			choices: [
				'Sales Lead',
				'Salesperson',
				'Lead Engineer',
				'Software Engineer',
				'Accountant',
				'Legal Team Lead',
				'Lawyer'
			]
		}
	],
	updateEmployMan: [
		{
			type: 'list',
			name: 'selectEm',
			message: 'Which employee would you like to update?',
			choices: [
				'Luke Skywalker',
				'Rey Skywalker',
				'Leia Organa',
				'Ben Solo',
				'Lando Calrissian',
				'Finn Schwartz',
				'Poe Dameron'
			]
		},
		{
			type: 'list',
			name: 'newMan',
			message: 'Who will be the new manager of this employee?',
			choices: [ 'Yoda', 'Obi-Wan Kenobi', 'Mace Windu' ]
		}
	]
};

module.exports = questions;
// [ 'Yoda', 'Obi-Wan Kenobi', 'Mace Windu' ]
