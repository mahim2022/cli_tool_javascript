var http = require("http");
const logger = require("./src/logger");
module.exports = function server() {
	var server = http.createServer((req, res) => {
		if (req.url === "/") {
			res.end("Deployed server from cli");
		}
	});
	try {
		server.listen(3000);
		logger.log("Server on port 3000");
	} catch (error) {
		console.log(error);
	}
};
