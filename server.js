const http = require("http");
const port = process.env.PORT || 5000;
const {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct
} = require("./controllers/productController");

const server = http.createServer((req, res) => {
	if (req.url === "/api/products" && req.method === "GET") {
		getProducts(req, res);
	} else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "GET") {
		console.log(
			'\nserver.js | req.url.split("/") | /api/products/:id ->',
			req.url.split("/")[req.url.split("/").length - 1],
			"\n"
		);

		const id = req.url.split("/")[req.url.split("/").length - 1];

		getProduct(req, res, id);
	} else if (req.url === "/api/products" && req.method === "POST") {
		createProduct(req, res);
	} else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "PUT") {
		const id = req.url.split("/")[req.url.split("/").length - 1];

		updateProduct(req, res, id);
	} else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "DELETE") {
		const id = req.url.split("/")[req.url.split("/").length - 1];

		deleteProduct(req, res, id);
	} else {
		res.writeHead(404, { "Content-Type": "application/json" });

		res.end(JSON.stringify({ message: "route not found" }));
	}
});

server.listen(port, () => console.log(`server running on port ${port}`));
