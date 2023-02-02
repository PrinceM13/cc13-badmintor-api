module.exports = (sequelize, DataTypes) => {
    const PointTransaction = sequelize.define('PointTransaction', {
        moneyPerPoint: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { notEmpty: true }
        },
        point: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { notEmpty: true }
        }
    }, { underscored: true });

    PointTransaction.associate = db => {
        PointTransaction.belongsTo(db.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        PointTransaction.belongsTo(db.Order, {
            foreignKey: {
                name: 'orderId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });
    }

    return PointTransaction;
}