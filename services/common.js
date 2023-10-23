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
	// token =
	// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzQxYmYzZjgyMWM1MTM3ZTUwYjEwZiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk4MDkzMjMyfQ.n4dgvxU56add00R0FBPlr0Xr8_MnyvZt2OsxO4Qy3vU";
	return token;
};

// server.get("/", (req, res) => {
// 	res.json({ status: "success" });
// });
