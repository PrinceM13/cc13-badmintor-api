const { DISCOUNT, ITEM, FREE_SHIPPING, LEVEL_BRONZE, LEVEL_SILVER, LEVEL_GOLD, LEVEL_PLATINUM } = require('../config/constant');

module.exports = (sequelize, DataTypes) => {
    const Reward = sequelize.define('Reward', {
        code: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: { notEmpty: true }
        },
        detail: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        level: {
            type: DataTypes.ENUM(LEVEL_BRONZE, LEVEL_SILVER, LEVEL_GOLD, LEVEL_PLATINUM),
            allowNull: false,
            validate: { notEmpty: true }
        },
        point: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { notEmpty: true }
        },
        type: {
            type: DataTypes.ENUM(DISCOUNT, ITEM, FREE_SHIPPING),
            allowNull: false,
            validate: { notEmpty: true }
        },
        value: {    // optional for type = discount
            type: DataTypes.DECIMAL(10,2),
            validate: { notEmpty: true }
        },
        limit: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { notEmpty: true }
        },
        expirationDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: { notEmpty: true }
        },
        note: {  // optional
            type: DataTypes.STRING,
            validate: { notEmpty: true }
        }
    }, { underscored: true });

    Reward.associate = db => {
        Reward.hasMany(db.UserReward, {
            foreignKey: {
                name: 'rewardId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        Reward.hasMany(db.RewardTransaction, {
            foreignKey: {
                name: 'rewardId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        Reward.hasMany(db.Order, {
            foreignKey: {
                name: 'rewardId',
                validate: { notEmpty: true }
            },
            onDelete: 'RESTRICT'
        });
    }

    return Reward;
}