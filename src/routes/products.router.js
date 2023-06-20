import { Router } from 'express';

const router = Router();
let products = [];
let productIdCounter = 1;

router.get('/', (req, res) => {
    const { limit } = req.query;
    let limitedProducts = products;
    if (limit) {
        limitedProducts = products.slice(0, parseInt(limit));
    }
    res.json(limitedProducts);
});

router.get('/:pid', (req, res) => {
    const productId = req.params.pid;
    const product = products.find((p) => p.id === productId);
    if (!product) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
    }
    res.json(product);
});

router.post('/', (req, res) => {
    const {
        title,
        description,
        code,
        price,
        status = true,
        stock,
        category,
        thumbnails = [],
    } = req.body;

    const newProduct = {
        id: productIdCounter.toString(),
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
    };

    products.push(newProduct);
    productIdCounter++;
    res.json(newProduct);
});

router.put('/:pid', (req, res) => {
    const productId = req.params.pid;
    const updatedProduct = req.body;
    const product = products.find((p) => p.id === productId);
    if (!product) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
    }
    Object.assign(product, updatedProduct);
    res.json(product);
});

router.delete('/:pid', (req, res) => {
    const productId = req.params.pid;
    const index = products.findIndex((p) => p.id === productId);
    if (index === -1) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
    }
    const deletedProduct = products.splice(index, 1)[0];
    res.json(deletedProduct);
});

export default router;