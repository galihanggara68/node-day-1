var cookieTracker = (req, res, next) => {
	if (req.cookies.visitCount) {
		res.cookie("visitCount", parseInt(req.cookies.visitCount) + 1);
	} else {
		res.cookie("visitCount", 1);
	}
	next();
};

module.exports = cookieTracker;
