module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { notEmpty: true }
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: { notEmpty: true }
        },
        discount: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: { notEmpty: true }
        },
        note: {     // optional
            type: DataTypes.STRING,
            validate: { notEmpty: true }
        }
    }, { underscored: true });

    return OrderItem;
}