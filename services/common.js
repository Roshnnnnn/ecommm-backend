// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2Q1NWNjMTUwMjE3ZmYyMDJjNWZlNCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk4NTE4NDc2fQ.MsmqwWb9F4Ol3LZ9SegAeOB8hWQIznpf0mOfSpaTBfE";

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
	// token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2Q1NWNjMTUwMjE3ZmYyMDJjNWZlNCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk4NTE4NDc2fQ.MsmqwWb9F4Ol3LZ9SegAeOB8hWQIznpf0mOfSpaTBfE"
	return token;
};
