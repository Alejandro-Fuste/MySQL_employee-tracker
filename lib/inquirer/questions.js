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
	],
	addEmploy: [
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
			choices: [ '1', '2', '3', '4', '5', '6', '7' ],
			default: [
				'1-Sales Lead',
				'2-Salesperson',
				'3-Lead Engineer',
				'4-Software Engineer',
				'5-Accountant',
				'6-Legal Team Lead',
				'7-Lawyer'
			]
		},
		{
			type: 'list',
			name: 'manager',
			message: 'Who is the manager of the employee?',
			choices: [ '1', '2', '3' ],
			default: [ '1-Yoda', '2-Obi-Wan Kenobi', '3-Mace Windu' ]
		}
	],
	removeEmploy: [],
	updateEmploy: [],
	updateEmployRole: [],
	updateEmployMan: []
};

module.exports = questions;
