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
				'Add Role',
				'Add Department',
				'Remove Employee',
				'Update Employee',
				'Quit Program'
			]
		}
	],
	viewDepart: [
		{
			type: 'list',
			name: 'department',
			message: 'What department would you like to see?',
			choices: [ 'Sales', 'Engineering', 'Finance', 'Legal' ]
		}
	],
	viewManager: [
		{
			type: 'list',
			name: 'man',
			message: 'Select the manager to see his employees',
			choices: [ 'Yoda', 'Obi-Wan Kenobi', 'Mace Windu' ]
		}
	]
};

module.exports = questions;
