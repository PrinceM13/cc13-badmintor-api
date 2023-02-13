module.exports = (sequelize, DataTypes) => {
    const Promotion = sequelize.define('Promotion', {
        discount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            validate: { notEmpty: true }
        },
        expirationDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: { isDate: true }
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: { notEmpty: true }
        }
    }, { underscored: true });

    Promotion.associate = db => {
        Promotion.belongsTo(db.Product, {
            foreignKey: {
                name: 'productId',
                unique: true,
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });
    }

    return Promotion;
}