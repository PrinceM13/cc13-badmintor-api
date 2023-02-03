// authenticated only !!!
const { Cart } = require('../models');

exports.getMyInfo = async (req, res, next) => {
    res.status(200).json({ user: req.user });
};

exports.getMyCart = async (req, res, next) => {
    try {
        // get all products in cart
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