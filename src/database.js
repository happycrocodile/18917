const fs = require("fs");
const path = require("path");

const base = path.join(__dirname, "json");

const products = fs.readFileSync(path.join(base, "products.json"));

const payers = fs.readFileSync(path.join(base, "payers.json"));

const database = {
    products: JSON.parse(products),
    payers: JSON.parse(payers)
};

module.exports = database;
