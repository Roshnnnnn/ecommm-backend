const { User } = require("../model/User");
const crypto = require("crypto");

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
				res.status(201).json({ id: doc.id, role: doc.role });
			}
		);
	} catch (err) {
		res.status(400).json(err);
	}
};

exports.loginUser = async (req, res) => {
	// try {
	//   const user = await User.findOne(
	//     { email: req.body.email },
	//   ).exec();
	//   // TODO: this is just temporary, we will use strong password auth
	//   console.log({user})
	//   if (!user) {
	//     res.status(401).json({ message: 'no such user email' });
	//   } else if (user.password === req.body.password) {
	//       // TODO: We will make addresses independent of login
	//     res.status(200).json({id:user.id, role:user.role});
	//   } else {
	//     res.status(401).json({ message: 'invalid credentials' });
	//   }
	// } catch (err) {
	//   res.status(400).json(err);
	// }
	res.json(req.user);
};

exports.checkUser = async (req, res) => {
	res.json();
};
