module.exports = (sequelize, DataTypes) => {
    const Promotion = sequelize.define('Promotion', {
        discount: {
            type: DataTypes.DECIMAL,
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

    return Promotion;
}