var chalk = require("chalk");
var logger = require("../logger")("config:mgr");
// var pkgUp = require("pkg-up"); ///tracks pakage from anywher in the folder
var { cosmiconfigSync } = require("cosmiconfig");
var configLoader = cosmiconfigSync("tool");
var schema = require("./schema");
// var betterAjvErrors = require("better-ajv-errors").default;
var Ajv = require("ajv").default;
var ajv = new Ajv();

module.exports = function getconfig() {
	// var pkgPath = pkgUp.sync({ cwd: process.cwd() }); //get pkg.json location
	// var pkg = require(pkgPath);
	// if (pkg.tool) {
	// 	// console.log("Found Configuration", pkg.tool);
	// 	return pkg.tool;
	// } else {
	// 	console.log(chalk.yellow("Could not find configuration using default"));
	// 	return { port: 1234 };
	// }

	var result = configLoader.search(process.cwd());
	if (!result) {
		logger.warning("Could not find configuration using default");
		return { port: 1234 };
	} else {
		var isValid = ajv.validate(schema, result.config);
		if (!isValid) {
			logger.debug("Invalid config was supplied,", ajv.errors[0].message);

			logger.warning("Invalid config was supplied,", ajv.errors[0].message);
			process.exit(1);
		}
		return result.config;
	}
};
