var myLogger = function (req, res, next) {
	req.logTime = new Date().toISOString();
	console.log("LOGGED at ", req.logTime);
	next();
};

module.exports = myLogger;
