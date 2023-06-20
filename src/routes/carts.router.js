import { Router } from 'express';

const router = Router();
let carts = [];
let cartIdCounter = 1;

router.post('/', (req, res) => {
    const newCart = {
        id: cartIdCounter.toString(),
        products: [],
    };
    carts.push(newCart);
    cartIdCounter++;
    res.json(newCart);
});

router.get('/:cid', (req, res) => {
    const cartId = req.params.cid;
    const cart = carts.find((c) => c.id === cartId);
    if (!cart) {
        res.status(404).json({ error: 'Carrito no encontrado' });
        return;
    }
    res.json(cart.products);
});

router.post('/:cid/product/:pid', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const cart = carts.find((c) => c.id === cartId);
    if (!cart) {
        res.status(404).json({ error: 'Carrito no encontrado' });
        return;
    }
    const existingProduct = cart.products.find((p) => p.product === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.products.push({ product: productId, quantity: 1 });
    }
    res.json(cart.products);
});

export default router;