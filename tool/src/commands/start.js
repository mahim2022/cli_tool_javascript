var chalk = require("chalk");
var logger = require("../logger")("commands:start");

module.exports = function start(config) {
	logger.highlight("starting the app");
	logger.debug("Received configuration in start - ", config);
};
