const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const handlebars = require("express-handlebars");
const routes = require("./routes");
const database = require("./database");
const urls = require("./urls");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

app.use(urls.api, routes);

app.get(urls.index, (req, res) => {
    res.render("index", { products: database.products })
});

app.get(urls.product_details, (req, res) => {
    let { id } = req.params;
    let product = database.products.find(x => x.id === Number(id));

    res.render("product-details", { product: product, public_key: process.env.MERCADOPAGO_PUBLIC_KEY });
});

app.get(urls.feedback, (req, res) => {
    res.render("feedback");
});

module.exports = app;
