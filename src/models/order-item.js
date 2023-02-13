module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { notEmpty: true }
        },
        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            validate: { notEmpty: true }
        },
        discount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            validate: { notEmpty: true }
        },
        note: {     // optional
            type: DataTypes.STRING,
            validate: { notEmpty: true }
        }
    }, { underscored: true });

    OrderItem.associate = db => {
        OrderItem.belongsTo(db.Order, {
            foreignKey: {
                name: 'orderId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        OrderItem.belongsTo(db.Product, {
            foreignKey: {
                name: 'productId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });
    }

    return OrderItem;
}