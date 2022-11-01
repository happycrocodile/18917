const products = [
    {
        id: 1011,
        name: "Motorola Moto 52",
        image: "motorola-moto52.jpg",
        description: "Dispositivo móvil de Tienda e-commerce",
        category_id: "smartphone",
        unit_price: 2500.50
    },
    {
        id: 2104,
        name: "Motorola Moto G41",
        image: "motorola-motog41.jpg",
        description: "Dispositivo móvil de Tienda e-commerce",
        category_id: "smartphone",
        unit_price: 1460.55
    },
    {
        id: 3222,
        name: "Motorola Edge 30",
        image: "motorola-edge30.jpg",
        description: "Dispositivo móvil de Tienda e-commerce",
        category_id: "smartphone",
        unit_price: 1325.80
    },
    {
        id: 1043,
        name: "Samsung A21 5G",
        image: "samsung-a21-5g.jpg",
        description: "Dispositivo móvil de Tienda e-commerce",
        category_id: "smartphone",
        unit_price: 1890.65
    },
    {
        id: 5122,
        name: "Samsung A33",
        image: "samsung-a33.jpg",
        description: "Dispositivo móvil de Tienda e-commerce",
        category_id: "smartphone",
        unit_price: 1555.35
    },
    {
        id: 6004,
        name: "Samsung A32",
        image: "samsung-a32.jpg",
        description: "Dispositivo móvil de Tienda e-commerce",
        category_id: "smartphone",
        unit_price: 890.40
    },
    {
        id: 1987,
        name: "Samsung A22 5G",
        image: "samsung-a22-5g.jpg",
        description: "Dispositivo móvil de Tienda e-commerce",
        category_id: "smartphone",
        unit_price: 1160.25
    },
];

const payers = [
    {
        id: 1,
        name: "Lalo",
        surname: "Landa",
        email: "lalo@gmail.com",
        phone: {
            area_code: "11",
            number: 44444444
        },
        address: {
            street_name: "calle falsa",
            street_number: 123,
            zip_code: "1617"
        }
    }
];

const database = {
    products,
    payers,
};

module.exports = database;
