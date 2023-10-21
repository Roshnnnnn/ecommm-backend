const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const LocalStrategy = require("passport-local").Strategy;
const productsRouter = require("./routes/Products");
const categoriesRouter = require("./routes/Categories");
const brandsRouter = require("./routes/Brands");
const usersRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Order");
const { User } = require("./model/User");
const { isAuth, sanitizeUser } = require("./services/common");
const SECRET_KEY = "SECRET_KEY";

// const token = jwt.sign({ foo: "bar" }, SECRET_KEY);

// JWT options

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;

//passport strategies

passport.use(
	"local",
	new LocalStrategy(async function (username, password, done) {
		// by default passport uses username
		try {
			const user = await User.findOne({ email: username }).exec();
			if (!user) {
				return done(null, false, { message: "invalid credentials" }); // for safety
			}
			crypto.pbkdf2(
				password,
				user.salt,
				310000,
				32,
				"sha256",
				async function (err, hashedpassword) {
					if (!crypto.timingSafeEqual(user.password, hashedpassword)) {
						done(null, false, { message: "invalid credentials" });
					}

					const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
					done(null, token);
				}
			);
		} catch (err) {
			done(err);
		}
	})
);

passport.use(
	"jwt",
	new JwtStrategy(opts, async function (jwt_payload, done) {
		console.log({ jwt_payload });

		try {
			const user = await User.findOne({ id: jwt_payload.sub });
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		} catch (err) {
			return done(err, false);
		}
	})
);

// this creates session variable req.user on being called from callbacks

passport.serializeUser(function (user, cb) {
	console.log("serialize", user);
	process.nextTick(function () {
		return cb(null, sanitizeUser(user));
	});
});

// this changes session variable req.user when called from authorized request

passport.deserializeUser(function (user, cb) {
	console.log("de-serialize", user);

	process.nextTick(function () {
		return cb(null, user);
	});
});

//middlewares

server.use(
	session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: false,
	})
);
server.use(passport.authenticate("session"));

server.use(
	cors({
		exposedHeaders: ["X-Total-Count"],
	})
);
server.use(express.json()); // to parse req.body
server.use("/products", isAuth, productsRouter.router);
server.use("/categories", categoriesRouter.router);
server.use("/brands", brandsRouter.router);
server.use("/users", usersRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", cartRouter.router);
server.use("/orders", ordersRouter.router);

main().catch((err) => console.log(err));

async function main() {
	await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
	console.log("database connected");
}

server.listen(8080, () => {
	console.log("server started");
});
