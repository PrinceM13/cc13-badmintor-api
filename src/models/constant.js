module.exports = (sequelize, DataTypes) => {
    const Constant = sequelize.define('Constant', {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: { notEmpty: true }
        },
        value: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: { notEmpty: true }
        }
    }, { underscored: true });

    return Constant;
}