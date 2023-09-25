const { Product } = require("../model/Product");

exports.createProduct = (req, res) => {
	const product = new Product(req.body);
	product.save((err, doc) => {
		console.log({ err, doc });
		if (err) {
			res.status(400).json(err);
		} else {
			res.status(201).json(doc);
		}
	});
};
