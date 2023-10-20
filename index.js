const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const productsRouter = require("./routes/Products");
const categoriesRouter = require("./routes/Categories");
const brandsRouter = require("./routes/Brands");
const usersRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Order");

//passport strategies

passport.use(
	new LocalStrategy(function (username, password, done) {
		// by default passport uses username
		User.findOne({ email: username });
	})
);

// this creates session variable req.user on being called from callbacks

passport.serializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, {
			id: user.id,
			username: user.username,
			picture: user.picture,
		});
	});
});

// this changes session variable req.user when called from authorized request

passport.deserializeUser(function (user, cb) {
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
		store: new SQLiteStore({ db: "sessions.db", dir: "./var/db" }),
	})
);
server.use(passport.authenticate("session"));

server.use(
	cors({
		exposedHeaders: ["X-Total-Count"],
	})
);
server.use(express.json()); // to parse req.body
server.use("/products", productsRouter.router);
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

server.get("/", (req, res) => {
	res.json({ status: "success" });
});

server.listen(8080, () => {
	console.log("server started");
});
