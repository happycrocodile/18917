const express = require("express");
const router = express.Router();
const database = require("./database");
const mercadopago = require("mercadopago");

mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

router.get("/products", (req, res) => {
    res.json(database.products);
});

router.get("/products/:id", (req, res) => {
    let { id } = req.params;

    let product = database.products.find(x => x.id === Number(id));
    res.json(product);
});

router.post("/webhook", (req, res) => {
    console.log(req);

    res.status(200).json(true);
});

router.post("/create-preference", (req, res) => {

    let { payer_id, product_id, picture_url, quantity } = req.body;

    let payer = database.payers.find(x => x.id === Number(payer_id));

    let product = database.products.find(x => x.id === Number(product_id));

    let preference = {
        items: [
            {
                id: product.id,
                title: product.name,
                picture_url: picture_url,
                description: product.description,
                category_id: product.category_id,
                unit_price: Number(product.unit_price),
                quantity: Number(quantity),
            }
        ],
        payer: payer,
        back_urls: {
            "success": "http://localhost:3000/feedback",
            "failure": "http://localhost:3000/feedback",
            "pending": "http://localhost:3000/feedback"
        },
        payment_methods: {
            excluded_payment_methods: [
                {
                    id: "visa"
                }
            ],
            installments: 6
        },
        notification_url: "http://localhost:3000/api/webhook",
        statement_descriptor: process.env.STATEMENT_DESCRIPTOR,
        external_reference: process.env.EMAIL_ADDRESS,
        auto_return: "approved",
    };

    mercadopago.preferences.create(preference).then(function (response) {
        res.json({
            preference_id: response.body.id
        });
    }).catch(function (error) {
        console.log(error);
    });
});

module.exports = router;
