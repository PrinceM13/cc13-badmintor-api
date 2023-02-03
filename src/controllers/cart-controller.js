const { Cart } = require('../models');

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
}