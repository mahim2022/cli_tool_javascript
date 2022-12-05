var chalk = require("chalk");
var debug = require("debug");
module.exports = function createLogger(name) {
	return {
		log: (...args) => console.log(chalk.grey(...args)),
		warning: (...args) => console.log(chalk.yellow(...args)),
		highlight: (...args) => console.log(chalk.bgCyanBright(...args)),
		debug: debug(name),
	};
};
