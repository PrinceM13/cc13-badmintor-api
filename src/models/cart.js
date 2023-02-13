module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
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

    Cart.associate = db => {
        Cart.belongsTo(db.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        Cart.belongsTo(db.Product, {
            foreignKey: {
                name: 'productId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });
    }

    return Cart;
}