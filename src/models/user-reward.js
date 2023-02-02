const { ACTIVE, INACTIVE, USED } = require('../config/constant');

module.exports = (sequelize, DataTypes) => {
    const UserReward = sequelize.define('UserReward', {
        status: {
            type: DataTypes.ENUM(ACTIVE, INACTIVE, USED),
            allowNull: false,
            validate: { notEmpty: true }
        }
    }, { underscored: true });

    UserReward.associate = db => {
        UserReward.belongsTo(db.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        UserReward.belongsTo(db.Reward, {
            foreignKey: {
                name: 'rewardId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });
    }

    return UserReward;
}