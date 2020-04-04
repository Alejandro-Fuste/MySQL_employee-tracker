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
	]
};

module.exports = questions;
