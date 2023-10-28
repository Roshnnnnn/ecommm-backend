const passport = require("passport");

exports.isAuth = (req, res, done) => {
	return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
	return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies["jwt"];
	}
	//TODO : this is temporary token for testing without cookie
	token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2JmMjUyYTI2MGFjY2VhMGJjOGRlNyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk4NDMyNjA1fQ.SMa9O_79ZRI58mg6nZD5K4kN9Ldl20bD2ttmCiRxdtM";
	return token;
};

// server.get("/", (req, res) => {
// 	res.json({ status: "success" });
// });
