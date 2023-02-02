module.exports = (sequelize, DataTypes) => {
    const RewardTransaction = sequelize.define('RewardTransaction', {
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            validate: { notEmpty: true }
        },
        note: {     // optional
            type: DataTypes.STRING,
            validate: { notEmpty: true }
        }
    }, { underscored: true });

    return RewardTransaction;
}