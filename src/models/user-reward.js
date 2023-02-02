const { ACTIVE, INACTIVE, USED } = require('../config/constant');

module.exports = (sequelize, DataTypes) => {
    const UserReward = sequelize.define('UserReward', {
        status: {
            type: DataTypes.ENUM(ACTIVE, INACTIVE, USED),
            allowNull: false,
            validate: { notEmpty: true }
        }
    }, { underscored: true });

    return UserReward;
}