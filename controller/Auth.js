const { User } = require("../model/User");
const crypto = require("crypto");
const { sanitizeUser } = require("../services/common");

exports.createUser = async (req, res) => {
	// const user = new User(req.body);
	try {
		const salt = crypto.randomBytes(16);
		crypto.pbkdf2(
			req.body.password,
			salt,
			310000,
			32,
			"sha256",
			async function (err, hashedpassword) {
				const user = new User({ ...req.body, password: hashedpassword, salt });
				const doc = await user.save();

				req.login(sanitizeUser(doc), (err) => {
					if (err) {
						res.status(201).json();
					} else {
						res.status(400).json(sanitizeUser(doc));
					}
				});
			}
		);
	} catch (err) {
		res.status(400).json(err);
	}
};

exports.loginUser = async (req, res) => {
	res.json(req.user);
};

exports.checkUser = async (req, res) => {
	res.json();
};
