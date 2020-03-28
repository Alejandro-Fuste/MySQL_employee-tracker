const mysql = require('mysql');
const inquirer = require('inquirer');
const cliTable = require('cli-table');
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
	f.startPrompt();
});

// Call inquirer below
