const { Product, Promotion } = require('../models');

exports.getAllProductsByForeignKeyId = (foreignKeyId) => {
    return async (req, res, next) => {
        try {
            // get all products where model_id = modelId
            const products = await Product.findAll({
                where: { [foreignKeyId]: req.params[foreignKeyId] },
                include: { model: Promotion }
            });

            // response with all products data
            res.status(200).json({ products });
        } catch (err) {
            next(err);
        }
    };
};