const { PENDING, PACKING, SENT_OUT, SHIPMENT_COMPLETED } = require('../config/constant');

module.exports = (sequelize, DataTypes) => {
    const ShipmentStatus = sequelize.define('ShipmentStatus', {
        status: {
            type: DataTypes.ENUM(PENDING, PACKING, SENT_OUT, SHIPMENT_COMPLETED),
            allowNull: false,
            defaultValue: PENDING,
            validate: { notEmpty: true }
        },
        trackingNumber: {   // optional for shipping
            type: DataTypes.STRING,
            validate: { notEmpty: true }
        },
        employeeNote: {
            type: DataTypes.STRING,
            validate: { notEmpty: true }
        }
    }, { underscored: true });

    ShipmentStatus.associate = db => {
        ShipmentStatus.belongsTo(db.Employee, {
            foreignKey: {
                name: 'employeeId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        ShipmentStatus.belongsTo(db.Order, {
            foreignKey: {
                name: 'orderId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });
    }

    return ShipmentStatus;
}