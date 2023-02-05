// authenticated only !!!
const { Cart } = require('../models');
const createError = require('../utils/create-error');

exports.getMyInfo = async (req, res, next) => {
    res.status(200).json({ user: req.user });
};

exports.getMyCart = async (req, res, next) => {
    try {
        // get all products in Cart table
        const carts = await Cart.findAll({
            where: { userId: req.user.id },
            order: [['updatedAt', 'DESC']]
        });

        // response with all items in cart of authenticated user
        res.status(200).json({ carts });
    } catch (err) {
        next(err);
    }
};

exports.addMyCart = async (req, res, next) => {
    try {
        // check if userId x productId is already exist (updating instead of creating)
        const isExist = await Cart.findOne({
            where: {
                userId: req.user.id,
                productId: req.body.productId
            }
        });

        // is exist ---> update || is not exist ---> create
        if (isExist) {
            const newCart = { ...req.body, amount: req.body.amount + isExist.amount };
            // update product (amount, note) in Cart table
            const [totalUpdate] = await Cart.update(newCart, { where: { id: isExist.id } });

            // throw error (invalid cart id)
            if (totalUpdate === 0) { createError(`invalid cart id`, 400) }

            // response with success message
            res.status(200).json({ message: `cart was successfully updated (try to add existing product)` });
        } else {
            // insert product into Cart table
            await Cart.create({ ...req.body, userId: req.user.id });

            // response with success message
            res.status(200).json({ message: `product was successfully added to cart` });
        }

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
        const totalDelete = await Cart.destroy({ where: { id: +req.params.cartId } });

        // throw error (invalid cart id)
        if (totalDelete === 0) { createError(`invalid cart id`, 400) }

        // response just success status 204
        res.status(204).json();
    } catch (err) {
        next(err);
    }
};