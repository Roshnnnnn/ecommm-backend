const express = require("express");
const server = express();
const mongoose = require("mongoose");
const { createProduct } = require("./controller/Product");

//middleWare

server.use(express.json());

main().catch((err) => console.log(err));

async function main() {
	await mongoose.connect("mongodb://127.0.0.1:27017/test");
	console.log("Database connected");
}

server.get("/", (req, res) => {
	res.json({ status: "success" });
});

server.post("/products", createProduct);

server.listen(8080, () => {
	console.log("server started");
});
