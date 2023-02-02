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

    return PointTransaction;
}