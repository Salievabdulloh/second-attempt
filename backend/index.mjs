import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

let products = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Smartphone', price: 700 },
];

app.get('/', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const product = products.find((p) => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
});

app.post('/products', (req, res) => {
    const { name, price } = req.body;
    const newProduct = {
        id: products.length + 1,
        name,
        price,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
    const product = products.find((p) => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');

    const { name, price } = req.body;
    product.name = name || product.name;
    product.price = price || product.price;

    res.json(product);
});

app.delete('/products/:id', (req, res) => {
    const productIndex = products.findIndex((p) => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).send('Product not found');

    const deletedProduct = products.splice(productIndex, 1);
    res.json(deletedProduct[0]);
});

app.listen(PORT, () => {
    console.log(`Product API  running on http://localhost:${PORT}`);
});
