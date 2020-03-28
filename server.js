const mysql = require('mysql');
const inquirer = require('inquirer');
var Table = require('cli-table');
const questions = require('./lib/inquirer/questions');
const f = require('./lib/functions/functions');

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

connection.connect(function(err) {
	if (err) throw err;
	// Put the function that starts the prompt here
	startPrompt();
});

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
				//   multiSearch();
				console.log('2');
				break;

			case 'View All Roles':
				//   rangeSearch();
				console.log('3');
				break;

			case 'Add Employee':
				//   songSearch();
				console.log('4');
				break;

			case 'Add Role':
				//   songAndAlbumSearch();
				console.log('5');
				break;

			case 'Add Department':
				//   songAndAlbumSearch();
				console.log('6');
				break;

			case 'Remove Employee':
				//   songAndAlbumSearch();
				console.log('7');
				break;

			case 'Update Employee':
				//   songAndAlbumSearch();
				console.log('8');
				break;

			default:
				console.log('Exit');
				break;
		}
	});
}

// This function is to view all employees in the databse ==================================================

function viewEmployess() {
	connection.query('SELECT * FROM employee;', function(err, res) {
		if (err) throw err;

		console.table(res);
	});
}
