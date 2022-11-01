const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static("./public"));

const publicPath = __dirname + "/public/";

app.get("/", (req, res) => {
    res.sendFile("index.html");
});

app.get("/product-details", (req, res) => {
    res.sendFile("details.html");
});

app.get("/feedback", (req, res) => {
    res.json({
		payment: req.query.payment_id,
		status: req.query.status,
		merchant_order: req.query.merchant_order_id
    });
});

app.get("/images/:image", (req, res) => {
    res.sendFile(publicPath + "images/" + req.body.image);
});

app.use("/api", require("./routes"));

app.listen(port, () => {
    console.log("The server is now running on port " + port);
});
