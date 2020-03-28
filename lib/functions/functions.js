const inquirer = require('inquirer');
const questions = require('../inquirer/questions');

const f = {
	startPrompt: function() {
		inquirer.prompt(questions.start).then((res) => {
			// Switch Statement to do different actions based on answer choice
			//
			switch (res.toDo) {
				case 'Find songs by artist':
					//   artistSearch();
					break;

				case 'Find all artists who appear more than once':
					//   multiSearch();
					break;

				case 'Find data within a specific range':
					//   rangeSearch();
					break;

				case 'Search for a specific song':
					//   songSearch();
					break;

				case 'Find artists with a top song and top album in the same year':
					//   songAndAlbumSearch();
					break;

				default:
					console.log('Exit');
					break;
			}
		});
	}
};

module.exports = f;
