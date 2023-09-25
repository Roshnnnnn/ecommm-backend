const { Product } = require("../model/Product");

exports.createProduct = async (req, res) => {
	try {
		const product = new Product(req.body);
		const savedProduct = await product.save();
		res.status(201).json(savedProduct);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
