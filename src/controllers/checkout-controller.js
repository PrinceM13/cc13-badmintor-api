const omise = require('omise')({
    'publicKey': process.env.OMISE_PUBLIC_KEY,
    'secretKey': process.env.OMISE_SECRET_KEY,
});

exports.creditCard = async (req, res, next) => {
    const { email, detail, amount, token } = req.body;
    try {
        const customer = await omise.customers.create({ email, detail, card: token });
        const charge = await omise.charges.create({ amount, currency: 'thb', customer: customer.id });
        // console.log('charge -----> ', charge)

        res.json({ amount: charge.amount, status: charge.status });
    } catch (err) {
        console.log(err)
        next(err);
    }
};