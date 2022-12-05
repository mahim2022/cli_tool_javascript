#!/usr/bin/env node
// var process = require("process");
var arg = require("arg"); ///parses cmd argumennts
// import chalk from "chalk";
var chalk = require("chalk");
// var path = require("path");
var pkgUp = require("pkg-up"); ///tracks pakage from anywher in the folder
var getConfig = require("../src/configs/config-mgr");
var start = require("../src/commands/start");
const logger = require("../src/logger")("bin");
var server = require("../server");

try {
	var args = arg({
		"--start": Boolean,
		"--build": Boolean,
		"--server": Boolean,
	});

	logger.debug("Recieved args", args);

	if (args["--start"]) {
		var config = getConfig();
		start(config);
	}
	if (args["--server"]) {
		server();
	} else {
		logger.log("Invalid args");
	}
} catch (error) {
	logger.warning(error.message);
	console.log();
	usage();
}

function usage() {
	return console.log(`tool [cmd] options
    ${chalk.greenBright("--start")}\tStarts the app
    ${chalk.greenBright("--build")}\tBuilds the app`);
}
