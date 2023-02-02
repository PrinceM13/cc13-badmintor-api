const { WAITING_FOR_PAYMENT, WAITING_FOR_SHIPPING, ORDER_COMPLETED } = require('../config/constant');

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        discount: {     // optional
            type: DataTypes.DECIMAL,
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
            allowNull: false,
            validate: { notEmpty: true }
        },
        paymentDateTime: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: { isDate: true }
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
                allowNull: false
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