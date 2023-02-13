const { WAITING_FOR_PAYMENT, WAITING_FOR_SHIPPING, ORDER_COMPLETED } = require('../config/constant');

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        discount: {     // optional
            type: DataTypes.DECIMAL(10, 2),
            validate: { notEmpty: true }
        },
        includedRewardItem: {   // optional
            type: DataTypes.BOOLEAN,
            validate: { notEmpty: true }
        },
        status: {
            type: DataTypes.ENUM(WAITING_FOR_PAYMENT, WAITING_FOR_SHIPPING, ORDER_COMPLETED),
            allowNull: false,
            defaultValue: WAITING_FOR_PAYMENT,
            validate: { notEmpty: true }
        },
        paymentReceipt: {
            type: DataTypes.STRING,
            // allowNull: false,
            validate: { notEmpty: true }
        },
        paymentDateTime: {
            type: DataTypes.DATE,
            // allowNull: false,
            validate: { isDate: true }
        },
        isPickup: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: { notEmpty: true }
        },
        address: {     // optional for shipping
            type: DataTypes.STRING,
            validate: { notEmpty: true }
        },
        expectedDateTime: {     // optional for pick up
            type: DataTypes.DATE,
            validate: { notEmpty: true }
        },
        spare: {     // for spare
            type: DataTypes.STRING,
            validate: { notEmpty: true }
        },
        userNote: {     // optional
            type: DataTypes.STRING,
            validate: { notEmpty: true }
        }
    }, { underscored: true });

    Order.associate = db => {
        Order.hasMany(db.OrderItem, {
            foreignKey: {
                name: 'orderId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        Order.belongsTo(db.Reward, {
            foreignKey: {
                name: 'rewardId',
                validate: { notEmpty: true }
            },
            onDelete: 'RESTRICT'
        });

        Order.hasOne(db.RewardTransaction, {
            foreignKey: {
                name: 'orderId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        Order.hasOne(db.PointTransaction, {
            foreignKey: {
                name: 'orderId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        Order.hasOne(db.ShipmentStatus, {
            foreignKey: {
                name: 'orderId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        Order.belongsTo(db.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });
    }

    return Order;
}