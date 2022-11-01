const express = require("express");
const router = express.Router();
const mercadopago = require("mercadopago");
const database = require("./database");
const urls = require("./urls");

mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
    integrator_id: process.env.MERCADOPAGO_INTEGRATOR_ID,
});

router.post(urls.webhook, (req, res) => {
    res.status(200).json(req.body);
});

router.post(urls.create_preference, (req, res) => {

    let { payer_id, product_id, quantity, origin } = req.body;

    let payer = database.payers.find(x => x.id === Number(payer_id));
    let product = database.products.find(x => x.id === Number(product_id));
    let feedback = origin + urls.feedback;

    let payload = {
        items: [
            {
                id: product.id,
                title: product.name,
                picture_url: origin + urls.images + String.fromCharCode(47) + product.image,
                description: product.description,
                category_id: product.category_id,
                unit_price: Number(product.unit_price),
                quantity: Number(quantity),
            }
        ],
        payer: {
            name: payer.first_name,
            surname: payer.last_name,
            email: payer.email,
            phone: {
                area_code: payer.area_code,
                number: payer.phone
            },
            identification: {
                type: payer.type,
                number: payer.identification
            },
            address: {
                street_name: payer.street_name,
                street_number: payer.street_number,
                zip_code: payer.zip_code
            }
        },
        back_urls: {
            "success": feedback,
            "failure": feedback,
            "pending": feedback,
        },
        payment_methods: {
            excluded_payment_methods: [
                {
                    id: "visa"
                }
            ],
            installments: 6
        },
        statement_descriptor: process.env.STATEMENT_DESCRIPTOR,
        external_reference: process.env.EXTERNAL_REFERENCE,
        notification_url: req.hostname === "localhost" ? undefined : origin + urls.api + urls.webhook,
        auto_return: "approved",
    };

    mercadopago.preferences.create(payload).then(response => {
        res.json({
            preference_id: response.body.id
        });
    }).catch(error => {
        console.log(error);
    });
});

module.exports = router;
