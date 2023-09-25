const express = require("express");
const server = express();
const mongoose = require("mongoose");
// const { createProduct } = require("./controller/Product");
const productsRouters = require("./routes/Products");

//middleWare

server.use(express.json());
server.use("/products", productsRouters.router);

main().catch((err) => console.log(err));

async function main() {
	await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
	console.log("Database connected");
}

server.get("/", (req, res) => {
	res.json({ status: "success" });
});

// server.post("/products", createProduct);

server.listen(8080, () => {
	console.log("server started");
});
