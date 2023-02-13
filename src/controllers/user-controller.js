// authenticated only !!!
const { Cart, Product, Promotion, Order, OrderItem } = require('../models');
const createError = require('../utils/create-error');

exports.getMyInfo = async (req, res, next) => {
    res.status(200).json({ user: req.user });
};

exports.getMyCart = async (req, res, next) => {
    try {
        // get all products in Cart table
        const carts = await Cart.findAll({
            where: { userId: req.user.id },
            order: [['updatedAt', 'DESC']],
            include: {
                model: Product,
                include: Promotion
            },
        });

        // response with all items in cart of authenticated user
        res.status(200).json({ carts });
    } catch (err) {
        next(err);
    }
};

// -----------------------------------------------------------------------------------
const manageAddToCart = async (item, id) => {
    try {
        // check if userId x productId is already exist (updating instead of creating)
        const isExist = await Cart.findOne({
            where: {
                userId: id,
                productId: item.productId
            }
        });

        // is exist ---> update || is not exist ---> create
        if (isExist) {
            // const newCart = { ...item, amount: item.amount + isExist.amount };
            const newCart = item;
            // update product (amount, note) in Cart table
            const [totalUpdate] = await Cart.update(newCart, { where: { id: isExist.id } });

            // throw error (invalid cart id)
            if (totalUpdate === 0) { createError(`invalid cart id`, 400) }
        } else {
            // insert product into Cart table
            await Cart.create({ ...item, userId: id });
        }
    } catch (err) {
        console.error(err)
    }
}
// -----------------------------------------------------------------------------------
exports.addMyCart = async (req, res, next) => {
    try {
        await req.body.map(item => { manageAddToCart(item, req.user.id) });
        res.status(200).json({ message: `product was successfully added to cart` });
    } catch (err) {
        next(err);
    }
};

exports.updateMyCart = async (req, res, next) => {
    try {
        // update product (amount, note) in Cart table
        const [totalUpdate] = await Cart.update(req.body, { where: { id: +req.params.cartId } });

        // throw error (invalid cart id)
        if (totalUpdate === 0) { createError(`invalid cart id`, 400) }

        // response with success message
        res.status(200).json({ message: `cart was successfully updated` });
    } catch (err) {
        next(err);
    }
};

exports.deleteMyCart = async (req, res, next) => {
    try {
        // delete product from Cart table
        const totalDelete = await Cart.destroy({ where: { userId: req.user.id, productId: +req.params.productId } });

        // throw error (invalid cart id)
        if (totalDelete === 0) { createError(`invalid product id in your cart`, 400) }

        // response just success status 204
        res.status(204).json();
    } catch (err) {
        next(err);
    }
};

// order
// -----------------------------------------------------------------------------------
exports.createOrder = async (req, res, next) => {
    try {
        console.log('---------->', { ...req.body, userId: req.user.id })
        const order = await Order.create({ ...req.body, userId: req.user.id });

        // response with success order
        res.status(200).json({ order });
    } catch (err) {
        next(err);
    }
};

// order item
// -----------------------------------------------------------------------------------
const manageCreateOrderItem = async (item) => {
    try {
        await OrderItem.create(item);
    } catch (err) {
        console.error(err)
    }
}
exports.createOrderItems = async (req, res, next) => {
    try {
        console.log('10101010101010101001---------', req.body)
        req.body.map(item => { manageCreateOrderItem(item) });
        res.status(200).json({ message: `successfully add items to order-items` });
    } catch (err) {
        next(err);
    }
};

exports.getOrderdByUserId = async (req, res, next) => {
    try {
        const orders = await Order.findAll({ where: { userId: req.user.id }, include: { model: OrderItem } });
        if (!orders) { createError(`invalid user id`, 400) }
        res.status(200).json({ orders })
    } catch (err) {
        next(err);
    }
};