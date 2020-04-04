const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = require('./connection/connection');
const questions = require('./lib/inquirer/questions');
const functions = require('./lib/functions/functions');
var figlet = require('figlet');

// const fig =

fig();

connection.connect((err) => {
	if (err) throw err;
	// Put the function that starts the prompt here
	functions.startPrompt();
});

function fig() {
	figlet('Employee Tracker', (err, data) => {
		if (err) {
			console.log('Something went wrong...');
			console.dir(err);
			return;
		}
		console.log(data);
	});
}
